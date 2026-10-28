from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Adjust prize weights here. Larger weight = more likely.
PRIZES = [
    {"name": "تخفیف ۲۰٪", "weight": 22, "emoji": "💗"},
    {"name": "تخفیف ۱۰٪", "weight": 28, "emoji": "🎀"},
    {"name": "استنسیل رایگان", "weight": 14, "emoji": "🖤"},
    {"name": "طرح کوچک رایگان", "weight": 8, "emoji": "✨"},
    {"name": "پوچ", "weight": 12, "emoji": "🫧"},
    {"name": "مراقبت رایگان", "weight": 16, "emoji": "🪽"},
]

@app.get('/')
def home():
    return render_template('index.html', prizes=PRIZES)

@app.post('/spin')
def spin():
    data = request.get_json(silent=True) or {}
    name = str(data.get('name', '')).strip()[:80]
    phone = str(data.get('phone', '')).strip()[:30]
    if not name or not phone:
        return jsonify({"error": "اسم و شماره مشتری رو وارد کن."}), 400
    prize = random.choices(PRIZES, weights=[p['weight'] for p in PRIZES], k=1)[0]
    return jsonify({"prize": prize['name'], "emoji": prize['emoji']})

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=10000)
