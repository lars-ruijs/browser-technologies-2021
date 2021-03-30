# 👕 NERDSHIRT

NERDSHIRT is a website where users can design the most beautiful and geeky t-shirts. Choose your own color, put your own text on the shirt and order it! The created NERD shirts are saved in your own account, where you can access them at any time with your account code. Progressive Enhancement was applied to this project, so the core functionality of the site should always be usable, despite any potential limitations.

**About this project**

This project is part of the Browser Technologies course at CMD Amsterdam. In this course we learn what Progressive Enhancement is and how we can apply it to create good, robust, accessible websites for everyone.

<br>

<hr>

## ✨ View it live
![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ec8c3718-53c4-413f-af79-bd328777303b/nerdshirt-mockup.jpg](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fec8c3718-53c4-413f-af79-bd328777303b%2Fnerdshirt-mockup.jpg?table=block&id=cc008c9a-7edb-47da-a2e7-e5f718526298&width=8820&userId=&cache=v2)

You can view the live version of NERDSHIRT [here](https://nerdshirt.herokuapp.com/).

<hr>

<br>

## Core functionality

A user will be able to design, save and order their own t-shirt. 

### Wireflow

The image below shows the flow of the site. I have modified the flow several times in response to feedback. For example, I removed the dashboard page and incorporated its functionalities into the shopping cart, and I moved the request for personal data to the very last step.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2e93f0df-28d4-4444-b844-e35119782fd7/IMG_3385.jpg](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2e93f0df-28d4-4444-b844-e35119782fd7%2FIMG_3385.jpg?table=block&id=7483226c-0266-493c-81d0-7060e9c52b15&width=8060&userId=&cache=v2)

<details>
 <summary>View my older Wireflow here</summary>
  <br>
  
  ![IMG_3370](https://user-images.githubusercontent.com/60745347/112205824-82b47b00-8c15-11eb-98a1-aafb3e0ae870.JPG)
  
</details>

<details>
  <summary>View my very first sketches</summary>
  <br>
  
  <img src="https://user-images.githubusercontent.com/60745347/111468575-00641c80-8726-11eb-9b69-0a6561f2afa3.JPG" alt="schets" width="60%" />
<img src="https://user-images.githubusercontent.com/60745347/111468587-035f0d00-8726-11eb-8efd-93c29bed211e.JPG" alt="schets" width="60%" />
<img src="https://user-images.githubusercontent.com/60745347/111468594-0659fd80-8726-11eb-8a3e-0e9ff22643a7.JPG" alt="schets" width="60%" />
<img src="https://user-images.githubusercontent.com/60745347/111468605-0954ee00-8726-11eb-9ab5-e05b99d6340a.JPG" alt="schets" width="60%" />
<img src="https://user-images.githubusercontent.com/60745347/111468613-0c4fde80-8726-11eb-992f-953c7655efe7.JPG" alt="schets" width="60%" />

</details>

<br>

## Layers

The website is built in 3 layers: functional, usable and pleasurable. This allows you to ensure that the previously described core functionality is always available to all users. At the same time you make it possible to bring the best possible experience to users who have the most modern resources at their disposal.

### Functional

- In this layer, the HTML is fully visible and working;
- A form allows the user to enter their preferences for the shirt and that form can be submitted;
- A code can be used to log in and view saved or previously created shirts;
- Saved shirts can be edited.

For example, when CSS is turned of, the design studio looks like this:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c5dc6c6f-6ccd-4aca-b929-81814494429a/Schermafbeelding_2021-03-30_om_11.13.54.png](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc5dc6c6f-6ccd-4aca-b929-81814494429a%2FSchermafbeelding_2021-03-30_om_11.13.54.png?table=block&id=f1e6e49b-0d9b-46fa-8936-173f7767348d&width=2880&userId=&cache=v2)

### Usable

- In this layer, the focus is on making the site user-friendly;
- By applying styling, the visual hierarchy is improved and the site is more pleasant to look at;
- By adding focus and hover styling, interactive elements are more usable;
- Adding optimizations will make the site more usable on smaller screens.

### Pleasurable

- In this layer, the user experience is further enhanced making the experience enjoyable;
- When the user makes adjustments to the shirt, they are immediately visualized;
- The user can copy a login code with the click of a button;
- The login session is stored locally with the user so that they are automatically logged in;

<br>

## Browser features

To improve the user's experience, I applied browser features. Click on a feature to read more about the browser features and how I applied them.

<details>
  <summary>Clipboard API</summary>
  <br>
  
In my concept, I use login codes that allow the user to access designed t-shirts anytime (even when local storage, etc. are disabled). This login code is shown to the user the moment a shirt is saved for the first time. The user can manually copy and paste it somewhere else to save the code. To simplify this process, I applied the Clipboard API. With the Clipboard API, you can have the user copy the login code with one press. I use the function writeText for this, which is available without the user having to give explicit permission. In Firefox, this function can only be used when the user gives initiative to copy something. Therefore, it is only executed when the user clicks on a code.

Because the Clipboard API is not available with all browsers, I first check whether the browser has access to the Clipboard API. Then I make the browser listen for a click event on the code:


```jsx
if(navigator.clipboard) {
    codeInput.addEventListener("click", async function() {
	    try {
	        await navigator.clipboard.writeText(codeInput.value);
	    } catch(err) {
	        console.error('Failed to copy: ', err);
	    }
    });
}
```

</details>

<details>
  <summary>Local Storage API</summary>
  <br>
  
To further simplify code retention for the user, I have applied local storage for browsers that support it. The moment you are presented with a code, this code is also stored in local storage. When you close the website or come back later, the login session is saved and you don't have to login again.

So instead of the login screen below:

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5aa1ea7c-9b61-4fa8-8152-58a7fe36e368/Untitled.png](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5aa1ea7c-9b61-4fa8-8152-58a7fe36e368%2FUntitled.png?table=block&id=7dcad485-1211-44f8-8eca-56e6dc49b2c8&width=3730&userId=&cache=v2)

You will now see that at the home screen, the login field has disappeared and you can immediately design a shirt or view your shopping cart.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fd853a27-1bbc-4aa9-bc02-855d183b4ae7/Untitled.png](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ffd853a27-1bbc-4aa9-bc02-855d183b4ae7%2FUntitled.png?table=block&id=7b1bfad6-60a5-40ab-92a8-d5da4b637b1e&width=3640&userId=&cache=v2)

Before applying local storage, I first check if the user's browser supports it. Then I select the input field of the code and add its value to local storage. I also add an event listener on the logout button that allows the stored code to be removed from local storage if the user prefers.


```jsx
if (window.localStorage) {

    // If codeInput field is present > set value to localStorage item "code"
    if(codeInput) {
        localStorage.code = codeInput.value;
    }

    // Remove code from local storage on logout
		if(logoutButton && localStorage.code && localStorage.code.length === 8) {
        logoutButton.addEventListener("click", function() {
            // Remove code
            localStorage.removeItem('code');
        });
    }
}
```
</details>

<details>
  <summary>Constraint validation API</summary>
  <br>
  
On the login screen of the home page, I ask users to log in with a login code of exactly 8 characters. Should the user use fewer or more characters, I can use the Constraint validation API to display a custom error message. This makes the error message clearer and more consistent on different browsers.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3433f017-d05f-4863-becc-cecabac95b60/Untitled.png](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3433f017-d05f-4863-becc-cecabac95b60%2FUntitled.png?table=block&id=1fbc6734-198a-43bb-bfe6-033a379895eb&width=1340&userId=&cache=v2)

The Constraint validation API is used in conjunction with an event listener that listens for the input() and invalid() events.

```jsx
loginInput.addEventListener('input', function() {
    loginInput.setCustomValidity('');
    loginInput.checkValidity();
  });

loginInput.addEventListener('invalid', function() {
    if(loginInput.value === '') {
        loginInput.setCustomValidity("Vul een logincode in");
    } 
    else if(loginInput.value.length < 8 || loginForm.value.length > 8) {
        loginInput.setCustomValidity("Inlogcodes bestaan uit exact 8 karakters. Je gebruikt er nu "+loginInput.value.length+".");
    }
});
```
</details>

<br>

## CSS support

In my site I use flex and grid to position some elements. For example, with flex, the products in your shopping cart are displayed side by side, so you don't have a long list of products below each other. For the buttons, I sometimes apply inline flex to better align the icons next to the text that is inside the button. The use of flex and grid is not directly necessary, but it does add to the look and feel of the website. Because not all browsers support these functions, I first check with @support if I can use them. In the previously declared lines of CSS, the elements just use display: block, so they still look good on browsers that don't support flex and grid.


```css
@supports (display: flex) {
  /* Products inside shopping cart */
  main.page section.products {
    display: flex;
    flex-wrap: wrap;
    margin: 2em 0;
  }
}
/* Similar syntax for grid and inline-flex */
```

<br>

## Usability

It is important that the elements on the website have sufficient contrast so that everyone can read the texts properly. Therefore, I performed a contrast analysis for all the colors I use on my site, using [this tool](https://webaim.org/resources/contrastchecker/). Click on an element below to read more about how I checked the contrast.

<details>
  <summary>Text</summary>
    <br>
  
  The body text of the website uses a dark gray color (just not quite black) and it comes out well in the test for both small and large text.
  
  ![image](https://user-images.githubusercontent.com/60745347/112970140-2d64f600-914e-11eb-9d42-7e8622ca68cf.png)
  
 </details>
 
 <details>
  <summary>Heading and buttons</summary>
    <br>
  
  For the heading elements on the homepage, I use a purple background with white text. The same goes for the buttons. The other titles on the site have a purple color on a white background. The contrast ratio for these colors is 4.92:1. That meets the requirements for using headings and bold text (inside the buttons).
  
![image](https://user-images.githubusercontent.com/60745347/112970247-48376a80-914e-11eb-82c5-d32b44201b0e.png)

 </details>
 
  <details>
    <summary>Inline links</summary>
    <br>
  
  I also use the purple color for the inline links to modify the created shirt. I also use a red color for the inline links that allow you to remove a shirt. For these elements, the text is smaller than the titles or text in buttons. The contrast checker showed that these colors for smaller text scored insufficiently at WCAG level AAA. Therefore I made these colors darker, so that the contrast ratio improved to 7.24:1. With this, the contrast is also sufficient for smaller text.
  
![image](https://user-images.githubusercontent.com/60745347/112970366-68672980-914e-11eb-86ea-c7674175a021.png)

 </details>

  <details>
    <summary>Error messages</summary>
    <br>
  
  Any inline error messages, for example under individual form elements, use the dark red color described above. For larger error messages, for example when a form cannot be submitted, I use a slightly lighter red color. According to the contrast checker, this red color provides sufficient contrast when using larger text.
  
![image](https://user-images.githubusercontent.com/60745347/112970636-af551f00-914e-11eb-90e1-24c0f951e2aa.png)

 </details>
 
 <br>
 
 ## Interactive elements

For interactive elements, it is important that they are visibly interactive. Thus, they must provide feedback to the user. I applied this by giving the buttons an effect that makes it seem as if you are really pressing the button.

![ezgif-3-df745fde0490](https://user-images.githubusercontent.com/60745347/112972059-22ab6080-9150-11eb-8b86-58cf7a81533e.gif)

In addition to having a visible hover and active state, it is also important to apply proper focus styling. For example, for users who navigate using a keyboard. I have given a focus style to all elements that need this. Below is an example of the focus styles for the inline link and buttons. Because of the yellow color they stand out well and this is also a different color scheme than the purple buttons, which makes them visible as focus state even for color blind.

![image](https://user-images.githubusercontent.com/60745347/112970715-c7c53980-914e-11eb-8ae1-895cd4a01d9d.png)

<br>

## Feature list testing

During one of the first assignments for this course, we were testing some web features. Now I have tested all these features on the NERD shirt website. And to check to what extent it affects the user experience.

 <details>
    <summary>Turning off images</summary>
    <br>
  
  I use images only for displaying the T-shirts. When images are disabled, or cannot be loaded, alt texts are visible. This does not affect the core functionality of the application. It is still fully usable.
  
![image](https://user-images.githubusercontent.com/60745347/112971383-736e8980-914f-11eb-821d-e04aae670ae4.png)

 </details>
 
  <details>
    <summary>Turning off custom fonts</summary>
    <br>
  
  In my application, I use the local fonts used by the operating system interface. This eliminates the need for me to load external fonts, and generally the local fonts from the system UI look fine. Should none of the system fonts be available, I ask the browser to display an available sans-serif font.
  
  
 ```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
```

 </details>
 
   <details>
    <summary>Testing color blindness</summary>
    <br>
  
**Protanopia en Deuteranopia**

In this form of color blindness, you have difficulty perceiving red and green colors. Below you can see what the color spectrum looks like for both conditions.

![image](https://user-images.githubusercontent.com/60745347/112971622-b4669e00-914f-11eb-959e-21606a853e8c.png)

**Tritanopia** 

In this form of color blindness, you have difficulty perceiving blue and yellow colors. Below you can see what the color spectrum looks like for this condition.

![image](https://user-images.githubusercontent.com/60745347/112971737-cf391280-914f-11eb-9717-804cfcf4cb3e.png)

Because in the design studio I have not only represented the colors as a color, but also put the name of the color next to it, the colors can also be understood by users that are color blind.

**Achromatopsia**

In this form of color blindness, you can no longer see colors at all. The site will then look completely in shades of gray. Because I have used contrast in the primary and secondary buttons, the difference between them is still clearly visible. Also the focus state of the buttons is still visible, because I used a lighter color as background and made the letters darker.

![image](https://user-images.githubusercontent.com/60745347/112971837-e7109680-914f-11eb-8a52-508b06137998.png)

 </details>
 
   <details>
    <summary>Mouse/trackpad not working</summary>
    <br>
  
  When your mouse or trackpad doesn't work or you can't use it, the keyboard is still the only way to control a website. Because I used :focus styles in my site, keyboard users can easily see which element they have currently selected. I added focus styles on all elements that you can interact with. Below is an example of using keyboard navigation through the options of the design studio form:
  
![ezgif-7-5c197ae57bfd](https://user-images.githubusercontent.com/60745347/112971964-0ad3dc80-9150-11eb-93c9-2480278a1640.gif)

 </details>
 
  <details>
    <summary>Turning off broadband internet</summary>
    <br>
  
  When broadband internet is not available, for example because you are in a remote area, the website will respond more slowly. I tested in Chrome with "Slow 3G" and saw that it increased the loading time by several seconds. This is mainly due to the initial response time of the server. In my application, I do not use external APIs, the images are relatively small and no external fonts need to be downloaded. This saves a lot of loading time. Saving a shirt still works with a slow connection, but takes a few seconds longer. My application does not work when there is no internet available at all.

 </details>
 
   <details>
    <summary>Disable JavaScript</summary>
    <br>
  
 When JavaScript is disabled, the core functionality of the application is still fully usable. A user, can design, save and order a shirt without the need for JavaScript. This is because the pages are rendered by the server and the data is also stored on the server. Some enhancements that depend on JavaScript will not work. I have listed them below:

- Live preview of changes to a shirt. Changing the model, the color or adding text is still possible, only the changes are no longer shown live on the screen.
- Automatic copying of a login code. The user can still copy the code manually, but no longer by clicking on the code.
- Automatically adding a login code to local storage. The login session cannot be stored in local storage, so the user will be able to log in manually using the login code.
- Client-side form validation. Any error messages for invalid input will no longer be displayed below the form. When HTML form validation is still available it will always be used. When this is not available either, the sent data will be validated by the server. If they are not valid, the server will return a page with additional information.

   ![image](https://user-images.githubusercontent.com/60745347/112972578-afeeb500-9150-11eb-9932-ba149503673d.png)

 </details>
 
   <details>
    <summary>Declining Cookies/Disable Local Storage</summary>
    <br>
  
 My site does not use cookies to store data. However, it is sometimes the case that disabling cookies in the browser also automatically disables local storage. This means that the site will not automatically remember your login code and you will have to copy it manually and use it later to log in again.

 </details>
 
 <br>
 
 ## Browser tests

To verify that my site works in various browsers, I tested the site on Google Chrome, Firefox, Safari on iOS and Google Chrome on Android. Click on an element below to read more about that browser's test result.

<details>
    <summary>Google Chrome v89 (macOS 11.2.1)</summary>
    <br>
  
  ![image](https://user-images.githubusercontent.com/60745347/112973456-a3b72780-9151-11eb-8934-707d8ccbc48f.png)

 Google Chrome is the browser I personally use the most for development and browsing. No major problems occurred during testing. One of the things that did stand out though, had to do with hiding the default radio buttons. I had initially hidden them by adding a width and height of 0, but in Chrome this causes any validation messages not to be displayed. Therefore, I later replaced this with opacity: 0 (which turned out to be important for Firefox as well).
 
 ![image](https://user-images.githubusercontent.com/60745347/112973540-bf223280-9151-11eb-96a2-3b33118ee5d6.png)

Originally I had also moved the radio buttons all the way to the top of the form, but this caused the validation messages to be placed over the labels. Also, it caused you to always automatically scroll to the top of the page after clicking an option. I solved this by placing the radio buttons at the bottom of the first label.


Furthermore, I tested whether the browser features below work:

- ✅ **Clipboard API:** This API is available as of Chrome version 66 (April 2018). Because I first check if this API is available, the site will continue to function even if the Clipboard API is not available.
- ✅ **Local Storage API:** This API has been available since the launch of Chrome. However, the user may have turned off local storage. Also, local storage in Incognito mode is only available as long as the user has not closed the browser. After that the local storage is emptied again. In my script I always check if local storage is available before I use it. In addition, I always give the user the possibility to copy the login code manually.
- ✅ **Custom Validity API:** This functionality has also been present since the beginning of Chrome and in my test always shows the own error message nicely.
- ✅ **Flex:** is fully supported since version 29 (2013). With older versions of the browser I will fall back on display block. So the content will always remain visible.
- ✅ **Grid:** is fully supported since version 57 (2017). With older versions of the browser I will fall back on display block. So the content will always remain visible.


### Older version of Google Chrome

Via Lambdatest, I also viewed the site from a slightly older version of chrome (version 87) and there, to my surprise, I saw that the display: flex; line was not being executed. After a short investigation this turned out to have to do with the fact that in my selector where I apply flex I had added a :not() element to exclude one of the fieldsets from display flex. It turns out that :not() is only supported from Chrome version 88 on. I then removed this selector and then the site worked properly again.

```css
/* Does not work in older Chrome versions */
  div.studio fieldset:not(fieldset:nth-of-type(3)) {
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
```

 </details>
 
 <details>
    <summary>Firefox v87 (macOS 11.2.1)</summary>
    <br>
  
![image](https://user-images.githubusercontent.com/60745347/112973776-f5f84880-9151-11eb-9483-db1468a445e7.png)

When testing through Firefox, I didn't encounter any other major problems either. In Firefox I did find that hiding radio buttons with width and height is 0, will not completely hide the radio button. There is just a very small radio button visible at that moment. See screenshot below:
 
![image](https://user-images.githubusercontent.com/60745347/112973854-0b6d7280-9152-11eb-8803-d048cd400844.png)

The radio button did not completely disappear until I set the element's opacity to 0. 


I also tested whether the browser features below work:

- ✅ **Clipboard API:** This API is available as of Firefox version 63 (October 2018). With Firefox, however, only text may be copied to the clipboard without needing additional permission and it may not happen automatically. The user must always perform an action before copying to the clipboard. Therefore, in my site, text is only copied to the clipboard when the user clicks on the login code. In my script, I first check if this API is available, before using it. This means that the site will continue to function even if the Clipboard API is not available.
- ✅ **Local Storage API:** This API has been available since Firefox version 3.5 (Jun 2009). However, the user may have turned off local storage. Also, local storage in private browsing mode is only available as long as the user has not closed the browser. After that the local storage is emptied again. In my script I always check if local storage is available before I use it. In addition, I always give the user the possibility to copy the login code manually.
- ✅ **Custom Validity API:** This functionality has been present since version 4 (Mar 2011) and in my test always shows the custom error message nicely.
- ✅ **Flex:** is fully supported since version 28 (2014). With older versions of the browser I will fall back on display block. So the content will always remain visible.
- ✅ **Grid:** is fully supported since version 52 (2017). With older versions of the browser I will fall back on display block. So the content will always remain visible.

 </details>
 
 <details>
    <summary>Safari on iOS (v14.4.2)</summary>
    <br>
  
![image](https://user-images.githubusercontent.com/60745347/112974039-48d20000-9152-11eb-9af1-d39eebbce99b.png)

Safari is the default browser I use on my iPhone. As PPK told us earlier in his browser lecture, really all browsers on iOS are secretly just Safari with a different look or modified range of functionality. So it's important to check that it's working properly on Safari, because effectively all iPhone users are dealing with it.

I also tested whether the browser features below work:

- ✅ **Clipboard API:** This API is available on iOS Safari version 13.4 (Mar 2020). The use of this API is only available on a secured connection and can be triggered only during a ["user gesture"](https://portswigger.net/daily-swig/new-safari-clipboard-api-includes-additional-browser-security-privacy-mechanisms). Therefore, in my site, text is only copied to the clipboard when the user clicks on the login code. In my script, I first check if this API is available, before using it. This means that the site will continue to function even if the Clipboard API is not available.
- ✅ **Local Storage API:** This API has been available since the launch of Safari on iOS. However, starting from iOS 13.4, Safari limits the number of days something can remain in local storage. From the first time you visit a site, something will stay in local storage for up to 7 days if you don't visit the site in between ([source](https://portswigger.net/daily-swig/new-safari-clipboard-api-includes-additional-browser-security-privacy-mechanisms)). In private mode, local storage is cleared as soon as you close the tab. The user may also have deliberately disabled local storage. In my script I always check if local storage is available before I use it. In addition, I always give the user the possibility to copy the login code manually.
- ✅ **Custom Validity API:** This functionality has been present since version 4 (Sep 2010) and in my test always shows the custom error message nicely.
- ✅ **Flex:** is fully supported since version 9 (2015). With older versions of the browser I will fall back on display block. So the content will always remain visible.
- ✅ **Grid:** is fully supported since version 10.3 (2017). With older versions of the browser I will fall back on display block. So the content will always remain visible.

 </details>

 <details>
    <summary>Chrome v89 (Nokia 8, Android 9)</summary>
    <br>
  
![image](https://user-images.githubusercontent.com/60745347/112974397-b2eaa500-9152-11eb-9dfb-ad5f51ddf53e.png)

During this test with Chrome on Android I also did not encounter any major problems. When developing this site, I chose not to use external fonts, but only local fonts from the system UI (and otherwise sans-serif as a fallback). This is the first device I'm using that doesn't run on an Apple platform, so you'll also see that a different font is used (Roboto in this case). The difference is very subtle, so I personally don't mind that the text elements look slightly different on a device from another manufacturer. Because I don't use a fixed width for elements, the elements will also scale nicely if the font is slightly larger or smaller.


Something else that stood out during testing was the way Google Chrome on Android handles the maximum number of characters you can use within an input field. On all the other browsers I tested, the browser wouldn't let you continue typing if you wanted to use more than the maximum number of characters allowed. On Google Chrome Android, however, you can finish typing words that exceed the maximum number of characters and see them appear in the field. When you then type a space after that word, or leave the input field, the characters that exceed the maximum limit are removed again. This, of course, is a pretty crazy user experience. That's why it's also important that my error message is visible, so that you as a user know immediately that you're actually using too many characters.

![image](https://user-images.githubusercontent.com/60745347/112974488-d281cd80-9152-11eb-9ebd-d3b55377159b.png)


I also tested whether the browser features below work. Please note that Can I Use only mentions Chrome for Android version 89.

- ✅ **Clipboard API:** Fully working on Chrome for Android.
- ✅ **Local Storage API:** Working on Chrome for Android. However, the user may have turned off local storage. Also, local storage in private browsing mode is only available as long as the user has not closed the browser. After that the local storage is emptied again. In my script I always check if local storage is available before I use it. In addition, I always give the user the possibility to copy the login code manually.
- ✅ **Custom Validity API:** This functionality is fully working and in my test always shows the custom error message nicely.
- ✅ **Flex:** is fully supported. With older versions of the browser I will fall back on display block. So the content will always remain visible.
- ✅ **Grid:** is fully supported. With older versions of the browser I will fall back on display block. So the content will always remain visible.
 
 </details>

 
 <br>
 
 ## Sources

In creating this project, I consulted the following sources.

- **How to read and write to a JSON file** article with code examples by Atta. Read it [here](https://attacomsian.com/blog/nodejs-write-json-object-to-file).
- **Saving Data to JSON file** a YouTube video by The Coding Train with code examples. View the video [here](https://www.youtube.com/watch?v=6iZiqQZBQJY).
- **Clipboard API** documentation used from MDN. Read the documentation [here](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
- **Unblocking clipboard access** an article with code examples, written by Jason Miller and Thomas Steiner from [WEB.DEV](https://web.dev/async-clipboard/).
- **Storing data with local strorage** documentation used from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Storage).
- **Constraint validation API** documentation and code examples used from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation).
- **Insert element after another element** code example used from an answer by user "johannchopin" on [Stackoverflow](https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib).
- **Blur event listener** documentation used from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event).
- **Input event** documentation used about the input event listener, via [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event).
- **SVG icons** all inline SVG icons are from Iconmonstr (free use). View icons from Iconmonstr [here](https://iconmonstr.com/).
- **T-shirts** the shirt images are from various sources, found through Google with search option free use. 
