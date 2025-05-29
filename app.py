from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# CORS (frontend'den erişimi kolaylaştırmak için)
from flask_cors import CORS
CORS(app)

# Kitapları arayan fonksiyon
def search_books(query):
    conn = sqlite3.connect('books.db')
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    sql = """
        SELECT ISBN, [Book-Title], [Book-Author], [Year-Of-Publication], Publisher, [Image-URL-L]
        FROM books
        WHERE [Book-Title] LIKE ? OR [Book-Author] LIKE ?
        LIMIT 50
    """
    cur.execute(sql, (f'%{query}%', f'%{query}%'))
    rows = cur.fetchall()
    conn.close()
    # Sonucu JSON'a uygun hale getir
    return [dict(row) for row in rows]

@app.route('/api/books')
def get_books():
    search = request.args.get('search', '')
    books = search_books(search)
    return jsonify(books)

if __name__ == '__main__':
    app.run(debug=True)


