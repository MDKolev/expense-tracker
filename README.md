# Expense Tracker
  A simple expense tracker which can be used as a dairy for your expenses and incomes. You can access it [here](https://online-web-expense-tracker.netlify.app/) or follow the instructions below to download it's Docker Image and run it on your machine.


  ## Getting started
  ### Prerequisites
  Make sure you have Docker installed on your machine. You can download it from [here](https://www.docker.com/products/docker-desktop/).

  ### Pulling the Docker Image
  #### Using VS Code Terminal
   Open your project folder in VS Code.
   Open the terminal in VS Code by navigating to View > Terminal or pressing Ctrl+`.
   Run the Docker commands in the terminal.
  #### Using Command Line Interface (CLI)
   Open a terminal or command prompt on your machine.
   Run the Docker commands in the terminal or command prompt.

  --------------------------------------------------------------------
  
  To run the application, you need to pull the Docker Image from the Docker repository. You can do this using the following command:

  ```
  docker pull mdkolev/expense-tracker
  ```

  ### Running the Docker Container
  Once you have pulled the Image, you can run the Docker container using the following command:
  ```
  docker run -d -p 4444:5173 mdkolev/expense-tracker
  ```
  > **Notice** - the port _4444_ is used as an example. You can choose any port but that same port must be used in the next step as well

  ### Accessing the Application
  After running the container, you can access the application in your web browser at:
  ```
  http://localhost:4444
  ```
  --------------------------------------------------------------------
  ## If you encounter any issues, please feel free to open an issue or contact me directly.

  
