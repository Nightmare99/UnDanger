from twilio.rest import Client
import os
#os.system('clear')
import sys
import warnings
warnings.filterwarnings("ignore")
account_sid = 'AC18d33f9a9a9c89a5864288508df1b924'
auth_token = 'f3edf45f604e7600b327c853aa28fd27'
client = Client(account_sid, auth_token)

class DevNull:
    def write(self, msg):
        os.system('clear')
	print("detected")
	client.messages.create(
         body="FROM: VAISHNAVI HELP!! I AM IN DANGER MY LOCATION IS: 12.990613,80.217088 ",
         from_='+12029371962',
         to='+919444303320'
     )

sys.stderr = DevNull()
import snowboydecoder
import sys
import signal

interrupted = False


def signal_handler(signal, frame):
    global interrupted
    interrupted = True


def interrupt_callback():
    global interrupted
    return interrupted

if len(sys.argv) == 1:
    print("Error: need to specify model name")
    print("Usage: python demo.py your.model")
    sys.exit(-1)

model = sys.argv[1]

# capture SIGINT signal, e.g., Ctrl+C
signal.signal(signal.SIGINT, signal_handler)

detector = snowboydecoder.HotwordDetector(model, sensitivity=0.5)
print('Listening... Press Ctrl+C to exit')

# main loop
detector.start(detected_callback=snowboydecoder.play_audio_file,
               interrupt_check=interrupt_callback,
               sleep_time=0.03)

detector.terminate()
