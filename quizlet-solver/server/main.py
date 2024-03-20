import flask
from sys import platform
import pyautogui
from flask import Flask
import pyperclip

app = Flask(__name__)


@app.route("/")
def index():
    return "Flask server"


@app.route("/mouse/<int:x>/<int:y>/")
def click_location(x, y):
    pyautogui.moveTo(x, y)
    pyautogui.click()
    return "Clicked"


@app.route("/type/", methods=["POST"])
def type_value():
    args = eval(flask.request.data)
    value = args["value"]
    if value == "ENTER":
        pyautogui.press("enter")
        return "Enter pressed"
    pyperclip.copy(value)
    if platform == "win32":
        pyautogui.hotkey("ctrl", "v")
    if platform == "darwin":
        pyautogui.hotkey("command", "v")
    return "Typed"


if __name__ == '__main__':
    app.run(debug=True)
