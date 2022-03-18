# How to use :

Clone the project and execute the following commands :
<br/>

```bash
# to start the server on port 3005
npm run start-server
# then to start the client
npm run dev
# then go to the indicated link, it should be on port 3000
```

# Context :

As part of a technical assessement for l'Argus, I had to create the interface leboncoin users will use to consult their messages and interact with others.

The interface needs to work on both desktop & mobile devices.
<br/>
<br/>

# Thought process :

What I first needed to do was :

- Displaying a list of all the conversations
- Allowing the user to select a conversation
  - Inside the conversation, there is a list of all the messages between the user and their contact.
  - The user needs to be able to type and send new messagees.

**Having read the README, the API documentation and finally reviewing the code, I started taking some notes to have a plan.**
<br/>
<br/>

### Messages and conversations :

I decided to first retrieve messages and conversations, by simply using the API and the documentation I was given. You can also find it here :<br/>
[https://leboncoin.tech/frontend-technical-test/](https://leboncoin.tech/frontend-technical-test/).
<br/>
<br/>

### What about the design :

Having the data stored, I needed to display it on screen, and had to get my imagination working as I didn't have any mockup to work with. I looked at some messenger applications, Instagram, Whatsapp, even Leconcoin's, and then I decided to go for a design and colors people would feel at home with.<br/>

To implement it, I used Sass (scss) because so I could make use of variables and functions (especially a px to rem converter).<br/>
I also used Material UI for the input and some buttons, to have components and animations ready.
<br/>

I also implemented loading animations, so the user doesn't feel the loading time or wonders what's wrong with his app and why isn't it working correctly.
<br/>
<br/>

## Creating and deleting :

As I said earlier, the user needs to be able to send messages. So while implementing it, it didn't add them correctly to the database.
<br/>
<br/>

### Creating new messages :

Properties where missing from the newly created message, so I looked at the documentation again and I was sending the data correctly. So I took the liberty of adding a middleware in the messages.js file, that will only add a message if every property we need to display a message were received.<br/>

This being done, messages were now being able of being sent and displayed.
<br/>
<br/>

### Deleting messages :

I also added the possibility to delete messages, sadly I couldn't update the backend so they won't be deleted, but the interface is there, by clicking or hovering a message, you can choose to delete it.
<br/>
<br/>

## What about conversations :

Same thing as messages, the interface is there, but the backend isn't ready yet so while you can create new conversations, they won't be displayed.
<br/>
<br/>

## Error pages :

Whenever the user loses himself in the url, or if the server is malfunctionning, the user gets redirected to an error page. They will be welcomed by a message and a button asking them to go back to safety (the homepage).
<br/>
<br/>

---

## Contact :

If you have any more questions, feel free to contact me !<br/>
Website: [click here ! it's pretty](https://bryanmakendi.com)<br/>
Mail : bryan.makendi@gmail.com<br/>
LinkedIn : [Bryan Makendi](https://www.linkedin.com/in/bryan-makendi/)<br/>
