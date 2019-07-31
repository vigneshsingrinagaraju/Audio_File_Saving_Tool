#!flask/bin/python
from flask import Flask, jsonify
# from flask import Flask, abort, request 
from flask import Flask, render_template, request, redirect, Response,abort
from flask_cors import CORS, cross_origin
import json
import base64
import os
import os.path
import time

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/store_file', methods=['POST'])
@cross_origin()
def store_file():
    OUTPUT_FOLDER = "Audio_Files"
    #reading the parameters
    language = request.json['language']    
    topic = request.json['topic']  
    index=request.json['index']
    language=language.replace('data:audio/x-mpeg-3;base64,', '')
    audiodata = base64.b64decode(language,' /')
    save_path = os.path.join(OUTPUT_FOLDER, topic)
    #check if path exists or not 
    if not os.path.exists(save_path):
            os.makedirs(save_path)
    save_path_second=os.path.join(save_path, str(index))
    #check if path exists or not 
    if not os.path.exists(save_path_second):
            os.makedirs(save_path_second)
    timestr = time.strftime("%Y%m%d-%H%M%S")
    #writing the audio file into the folder 
    with open(save_path_second+"/"+timestr+".mp3", "wb+") as f: f.write(audiodata)
    return jsonify({"success": True})

if __name__ == '__main__':
    app.run(debug=True)