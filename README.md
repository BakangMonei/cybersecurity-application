## Cyber Security Assignment bi56kg [Monei Bakang Motshegwe]

# Secure Registration System Prototype

## Part 1 – System Design

- This is a secure user registration system built using React and Chakra UI. The system allows users to create an account by entering their username and password. The password must meet certain strength requirements, and the user must confirm the password. The form also includes a reCAPTCHA component to prevent bot submissions.

- This prototype system that demonstrates appropriate design of security systems and the application of programming principles to cybersecurity applications. It addresses the need for secure user registration in online communities by implementing features such as password strength evaluation and captcha verification to protect user information from bots.

### System Design [Features]

The system is designed to be secure and protect user information. The registration process involves several steps to ensure that the user is a human and not a bot. The system uses the following design principles: 

- **User Interface**: The system provides a user-friendly interface to prompt users to create an account by providing a username and password.

- **Password Strength Evaluation**: The chosen password by the user is algorithmically evaluated to determine its strength. This evaluation provides suitable feedback to the user about the password strength.

- **Captcha Functionality**: The system implements a captcha function to determine that the registration request is made by a human user rather than a machine (e.g., bot). Different types of captchas are researched and implemented to enhance security.

- User Input Validation: The system validates user input to ensure that it meets certain criteria. For example, the password must meet certain strength requirements.

- Feedback: The system provides feedback to the user about the password strength and whether the registration was successful.


## Implementation Details

The prototype system is built using the following technologies:

- **Language**: JavaScript (React)
    -- A JavaScript library for building user interfaces.

- **UI Framework**: Chakra UI
    -- A simple, modular and accessible component library that gives you all the building blocks you need to build your React applications.

- **Password Strength Estimation**: zxcvbn library
    -- An encryption library

- **Captcha**: Google reCAPTCHA service
    -- A free service from Google that helps protect websites from spam and abuse.

- **Database**: Firebase
    -- A Backend-as-a-Service (BaaS) that provides developers with a real-time database, authentication, and cloud functions.

## Getting Started

To run the prototype system locally, follow these steps:

1. Clone the repository to your local machine.

   ```
        git clone https://github.com/BakangMonei/cybersecurity-application
   ```

2. Navigate to the project directory.

   ```
       cd cybersecurity-application
   ```

3. Navigate to the project directory.

   ```
       npm i --legacy-peer-deps
   ```

4. Start the development server.

   ```
       npm run start
   ```

5. Open the application in your browser at http://localhost:3000

# Contributing

- We welcome contributions to this project. Before submitting a pull request, please make sure to read and follow our contributing guidelines.

# Conclusion

- This prototype system demonstrates the implementation of essential security features in a user registration system. By integrating password strength evaluation and captcha verification, it enhances the security of online communities and protects user information from malicious activities.
