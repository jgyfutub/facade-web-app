import base64
from flask import Flask,request,jsonify
import requests
import io
import tensorflow as tf
import time
from keras.models import load_model
from collections import Counter
import numpy as np
from PIL import Image
from flask_cors import CORS
import os
import matplotlib.pyplot as plt

#api so that neural style transfer can occur
app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/facadegenerator/',methods=['POST'])
def facadegenerator():
    base64_string=request.form.get('image')
    _, data = base64_string.split(',')
    image_data = io.BytesIO(base64.b64decode(data))
    image = Image.open(image_data)
    image = image.resize((256, 256))
    image = np.expand_dims(image, axis=0)
    image_array = (np.array(image) / 127.5)-1
    image_tensor = tf.convert_to_tensor(image_array, dtype=tf.float32)
    print(image_tensor.shape)
    model = load_model(r"C:\Users\Acer\OneDrive\Desktop\facadeapp\back\model1.h5")
    pred=model(image_tensor, training=True)
    pred=tf.squeeze(pred, axis=0)
    pred=(pred* 0.5 + 0.5)*255.0
    print(pred)
    array=tf.cast(pred,tf.uint8)
    print(array)
    array=array.numpy()
    imagegenerated = Image.fromarray(array)
    imagegenerated.save(r'C:\Users\Acer\OneDrive\Desktop\facadeapp\back\images\image.png','PNG')
    return jsonify({'message':'flask connected!!'})

if __name__ == '__main__':
    app.run(debug=True,port=5000)