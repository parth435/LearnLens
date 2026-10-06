from __future__ import annotations

from pathlib import Path
from typing import Any, Dict, List


class OCRService:
    def __init__(self, upload_dir: str = "./uploads") -> None:
        self.upload_dir = Path(upload_dir)
        self.upload_dir.mkdir(parents=True, exist_ok=True)

    def extract_text(self, file_path: str | Path) -> Dict[str, Any]:
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"File not found: {file_path}")

        return {
            "extracted_text": "Sample extracted theory answer text from the uploaded document.",
            "confidence": 0.89,
            "pages": [{"page_number": 1, "file_path": str(path), "extracted_text": "Sample extracted theory answer text from the uploaded document."}],
            "warning": "OCR output is approximate for handwritten or low-contrast documents.",
        }

    def validate_file(self, filename: str, content_type: str | None, file_size: int, max_size_mb: int = 10) -> None:
        allowed_exts = {".jpg", ".jpeg", ".png", ".pdf"}
        allowed_types = {"image/jpeg", "image/png", "application/pdf"}
        ext = Path(filename).suffix.lower()
        if ext not in allowed_exts:
            raise ValueError("Unsupported file type.")
        if content_type and content_type not in allowed_types:
            raise ValueError("Unsupported MIME type.")
        if file_size > max_size_mb * 1024 * 1024:
            raise ValueError("File is too large.")
