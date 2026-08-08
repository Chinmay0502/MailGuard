import os
import re
import pickle
import traceback
import uvicorn
import numpy as np
import tensorflow as tf

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tensorflow.keras.preprocessing.sequence import pad_sequences


# ============================================================
# APP CONFIGURATION
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_DIR = os.path.join(BASE_DIR, "model")

MODEL_PATH = os.path.join(
    MODEL_DIR,
    "gru_model.keras"
)

TOKENIZER_PATH = os.path.join(
    MODEL_DIR,
    "tokenizer.pkl"
)

LABEL_MAPPING_PATH = os.path.join(
    MODEL_DIR,
    "label_mapping.pkl"
)


# Your original model configuration
MAX_FEATURES = 5000
MAX_LENGTH = 500


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Spam Mail Classification API",
    description="GRU based spam email classification service",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# REQUEST MODEL
# ============================================================

class EmailRequest(BaseModel):
    email: str


# ============================================================
# GLOBAL MODEL VARIABLES
# ============================================================

model = None
tokenizer = None
label_mapping = None


# ============================================================
# TEXT CLEANING
# ============================================================

def clean_text(text: str) -> str:
    """
    Clean email text in the same general way used during training.
    """

    text = str(text).lower()

    # Remove HTML tags
    text = re.sub(r"<[^>]+>", " ", text)

    # Replace URLs
    text = re.sub(
        r"https?://\S+|www\.\S+",
        " ",
        text
    )

    # Keep letters and numbers
    text = re.sub(
        r"[^a-z0-9\s]",
        " ",
        text
    )

    # Remove extra whitespace
    text = re.sub(
        r"\s+",
        " ",
        text
    ).strip()

    return text


# ============================================================
# LOAD PICKLE SAFELY
# ============================================================

def load_pickle(path):
    """
    Load a pickle file.
    """

    if not os.path.exists(path):
        raise FileNotFoundError(
            f"File not found: {path}"
        )

    with open(path, "rb") as f:
        return pickle.load(f)


# ============================================================
# LOAD MODEL
# ============================================================

def load_resources():

    global model
    global tokenizer
    global label_mapping

    print("=" * 70)
    print("LOADING SPAM CLASSIFICATION MODEL")
    print("=" * 70)

    # --------------------------------------------------------
    # Check files
    # --------------------------------------------------------

    print("\nChecking model files...")

    print("MODEL:")
    print(MODEL_PATH)

    print("\nTOKENIZER:")
    print(TOKENIZER_PATH)

    print("\nLABEL MAPPING:")
    print(LABEL_MAPPING_PATH)

    # --------------------------------------------------------
    # Model
    # --------------------------------------------------------

    print("\nLoading GRU model...")

    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            f"""
GRU model not found.

Expected:
{MODEL_PATH}

Please make sure your model file is inside:

ml_service/
    model/
        gru_model.keras
"""
        )

    model = tf.keras.models.load_model(
        MODEL_PATH,
        compile=False
    )

    print("Model loaded successfully")

    # --------------------------------------------------------
    # Tokenizer
    # --------------------------------------------------------

    print("\nLoading tokenizer...")

    tokenizer = load_pickle(TOKENIZER_PATH)

    print("Tokenizer loaded successfully")

    # --------------------------------------------------------
    # Label mapping
    # --------------------------------------------------------

    print("\nLoading label mapping...")

    label_mapping = load_pickle(
        LABEL_MAPPING_PATH
    )

    print(
        "Label mapping:",
        label_mapping
    )

    # --------------------------------------------------------
    # Model information
    # --------------------------------------------------------

    print("\nModel input shape:")
    print(model.input_shape)

    print("\nModel output shape:")
    print(model.output_shape)

    print("\nConfiguration:")
    print({
        "max_features": MAX_FEATURES,
        "max_length": MAX_LENGTH
    })

    print("\n" + "=" * 70)
    print("ALL MODEL RESOURCES LOADED")
    print("=" * 70)


# ============================================================
# LOAD RESOURCES WHEN SERVER STARTS
# ============================================================

try:
    load_resources()

except Exception as e:

    print("\n")
    print("=" * 70)
    print("MODEL LOADING FAILED")
    print("=" * 70)

    print(str(e))

    traceback.print_exc()

    print("=" * 70)


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
def root():

    return {
        "status": "online",
        "service": "Spam Mail Classification API",
        "model": "GRU",
        "version": "1.0.0"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy" if model is not None else "model_not_loaded",
        "model_loaded": model is not None,
        "tokenizer_loaded": tokenizer is not None,
        "label_mapping_loaded": label_mapping is not None
    }


# ============================================================
# EMAIL CLASSIFICATION
# ============================================================

@app.post("/api/emails/check")
def check_email(request: EmailRequest):

    # --------------------------------------------------------
    # Validate model
    # --------------------------------------------------------

    if model is None:

        return {
            "success": False,
            "error": "Model is not loaded"
        }

    if tokenizer is None:

        return {
            "success": False,
            "error": "Tokenizer is not loaded"
        }

    if not request.email.strip():

        return {
            "success": False,
            "error": "Email cannot be empty"
        }

    # --------------------------------------------------------
    # Original email
    # --------------------------------------------------------

    original_email = request.email

    # --------------------------------------------------------
    # Clean email
    # --------------------------------------------------------

    cleaned_email = clean_text(
        original_email
    )

    # --------------------------------------------------------
    # Convert text -> sequence
    # --------------------------------------------------------

    sequence = tokenizer.texts_to_sequences(
        [cleaned_email]
    )

    # --------------------------------------------------------
    # Padding
    # --------------------------------------------------------

    padded_sequence = pad_sequences(
        sequence,
        maxlen=MAX_LENGTH,
        padding="post",
        truncating="post"
    )

    # --------------------------------------------------------
    # Prediction
    # --------------------------------------------------------

    prediction = model.predict(
        padded_sequence,
        verbose=0
    )

    probability = float(
        np.asarray(prediction).flatten()[0]
    )

    # --------------------------------------------------------
    # Determine label
    #
    # Your model:
    #
    # 0 = Ham
    # 1 = Spam
    #
    # --------------------------------------------------------

    if probability >= 0.5:

        prediction_label = "Spam"

        spam_probability = probability
        ham_probability = 1 - probability

    else:

        prediction_label = "Ham"

        spam_probability = probability
        ham_probability = 1 - probability

    # --------------------------------------------------------
    # Return response
    # --------------------------------------------------------

    return {

        "success": True,

        "email": original_email,

        "cleaned_email": cleaned_email,

        "prediction": prediction_label,

        "probability": probability,

        "spam_probability": spam_probability,

        "ham_probability": ham_probability,

        "sequence": sequence,

        "padded_length": len(
            padded_sequence[0]
        )
    }


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port
    )