from flask import Flask, request, jsonify
from textblob import TextBlob
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    
    print("Received data:", data)
    
    if not data or 'entries' not in data:
        return jsonify({'error': 'Invalid data format'}), 400
    
    entries = data['entries']
    
    results = []
    for entry in entries:
        id = entry.get('id', "")
        text = entry.get('text', '')
        title = entry.get('title', '')
        blob = TextBlob(text + ' ' + title)
        timestamp = entry.get('timestamp', '')
        sentiment = blob.sentiment.polarity
        
        if sentiment > 0.2:
            emotion = 'Positive'
        elif sentiment < -0.2:
            emotion = 'Negative'
        elif sentiment == 0:
            emotion = "Unknown"
        else:
            emotion = 'Neutral'
        
        results.append({'timestamp': timestamp, 'title': title, 'text': text, 'sentiment': sentiment, 'emotion': emotion, 'id': id})
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
