from flask import Flask, request, jsonify, render_template
from transformers import pipeline, AutoModelForCausalLM, Speech2TextProcessor, Speech2TextForConditionalGeneration, load_dataset
import torch

app = Flask(__name__)

# Load the text-to-speech model
synthesizer = pipeline("text-to-speech", "suno/bark")

# Load the text generation model
model_generation = AutoModelForCausalLM.from_pretrained("distilbert/distilgpt2")

# Load the speech-to-text model
model_s2t = Speech2TextForConditionalGeneration.from_pretrained("facebook/s2t-small-librispeech-asr")
processor_s2t = Speech2TextProcessor.from_pretrained("facebook/s2t-small-librispeech-asr")

# Load an example audio dataset
ds = load_dataset("hf-internal-testing/librispeech_asr_demo", "clean", split="validation")

@app.route('/')
def index():
    return render_template('start-screen.html')

@app.route('/send', methods=['POST'])
def send():
    transcription = request.form['transcription']

    # Text Generation
    input_ids = tokenizer.encode(transcription, return_tensors="pt")
    generated_text = model_generation.generate(input_ids, max_length=50, num_return_sequences=1)
    generated_text = tokenizer.decode(generated_text[0], skip_special_tokens=True)

    # Text-to-Speech
    synthesized_audio = synthesizer(generated_text)

    # Synthesize audio and save
    synthesized_audio.export("static/generated_audio.mp3", format="mp3")

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
