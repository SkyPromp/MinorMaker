const int BUTTON_PIN_RED = 2;
const int BUTTON_PIN_YELLOW = 5;
const int BUTTON_PIN_GREEN = 7;

int prev_button_state = HIGH;
int button_state;

unsigned long lastPressTime = 0;
const unsigned long cooldown = 5000; // 5 seconds

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN_RED, INPUT_PULLUP);
  pinMode(BUTTON_PIN_YELLOW, INPUT_PULLUP);
  pinMode(BUTTON_PIN_GREEN, INPUT_PULLUP);
}

void loop() {
  button_state = digitalRead(BUTTON_PIN_RED);

  if (prev_button_state == LOW && button_state == HIGH) {
    unsigned long now = millis();
    if (now - lastPressTime >= cooldown) {
      Serial.println("RED_BUTTON_PRESSED");
      lastPressTime = now;
    }
  }

  button_state = digitalRead(BUTTON_PIN_YELLOW);

  if (prev_button_state == LOW && button_state == HIGH) {
    unsigned long now = millis();
    if (now - lastPressTime >= cooldown) {
      Serial.println("YELLOW_BUTTON_PRESSED");
      lastPressTime = now;
    }
  }

    button_state = digitalRead(BUTTON_PIN_GREEN);

  if (prev_button_state == LOW && button_state == HIGH) {
    unsigned long now = millis();
    if (now - lastPressTime >= cooldown) {
      Serial.println("GREEN_BUTTON_PRESSED");
      lastPressTime = now;
    }
  }

  prev_button_state = button_state;
}
