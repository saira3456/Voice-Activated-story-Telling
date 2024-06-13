from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)
CORS(app)

# Load the GPT-2 model and tokenizer
model_name = "gpt2"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

@app.route('/api/generate', methods=['POST'])
def generate_text():
    data = request.get_json()
    prompt = data['prompt']
    inputs = tokenizer.encode(prompt, return_tensors='pt')
    
    # Generate text with specified parameters
    outputs = model.generate(
        inputs,
        max_length=250,            # Allow the model to generate up to 250 tokens
        min_length=200,            # Ensure at least 200 tokens are generated
        num_return_sequences=1,
        temperature=0.7,           # Control randomness
        top_k=50,                  # Limit sampling pool to top k tokens
        top_p=0.9,                 # Nucleus sampling
        repetition_penalty=1.2     # Penalize repeated sequences
    )
    
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({'response': text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
