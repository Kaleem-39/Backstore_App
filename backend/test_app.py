from fastapi.testclient import TestClient
from main import app  # assuming your FastAPI app is in main.py

client = TestClient(app)

def test_get_books():
    response = client.get("/books")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_add_book():
    new_book = {
        "id": 9999,  # dummy ID
        "title": "Test Book",
        "author": "Tester",
        "price": 9.99
    }
    response = client.post("/books", json=new_book)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Book"
    assert data["author"] == "Tester"
    assert data["price"] == 9.99
