# UnDanger - How to make it work 
 The raspberry pi zero W is used to take advantage of it's small size and ability to be easily carved into a wearable device along with the well known functionalities of the raspberry pi microcomputer.
 ## Dependencies
 - Python
 - Snowboy
 - Twillio
 - USB Microphone 
 - Compatible Battery 

 ## Installation
 ```sudo apt install python3 python3-pyaudio python3-pip libatlas-base-dev portaudio19-dev```
 
 ```sudo pip3 install pyaudio```
 
  ```sudo pip3 install requests```
  
   ```wget -O snowboy.tar.bz2 https://go.pimylifeup.com/napoRs/snowboy```
   
   Now that we have grabbed the latest version of the Snowboy software to our Raspberry Pi we need to extract it 

 get your snowboy api key : https://snowboy.kitt.ai/
 
  
 ## Recording your Custom Hotword for Snowboy
 
 ```nano /home/pi/training_service.py```
 
 - Remember to replace ENTER_TOKEN with the API token you retrieved in the previous segment and ENTER_HOTWORD with the hotword that you want to record
 
 - Record training files using arecord
 
  ```arecord --format=S16_LE --duration=5 --rate=16000 --file-type=wav 1.wav ```
  
  ```arecord --format=S16_LE --duration=5 --rate=16000 --file-type=wav 2.wav```
  
  ```arecord --format=S16_LE --duration=5 --rate=16000 --file-type=wav 3.wav ```
      
 
 -Run the following command to send off your three samples to the training service.
 
  ```python3 training_service.py 1.wav 2.wav 3.wav saved_model.pmdl```
 
 
 ## Sending SMS
 
  ```pip install twilio```
 
 - The remaining code template is included in the demp.py file.
 
 ## To set the device into action 
 
  ```python demo.py saved_model.pmdl```
 
