## Description
This is a message broker, which can be used to facilitate communication between different parts of a system. It has 2 main components - producer and worker.
Producer pushes the messages in the queue and then worker process each message sequentially and sends the email.

## Installation

### Prerequisites
- Node.js
- npm

### Steps
1. Clone the repository
2. Navigate to the project directory
3. Install dependencies

## API Reference
### POST /enque
- Description: Pushes a message in the queue
- Parameters:
  - `email` (string): Email of user whom you want to send mail.
  - `message` (string) : Message in your email.
  - `subject` (string) : Subject of your email.
  - `html` (string) : Content of your email.

## How to Run the project
Run a redis server before running the producer and worker file.
