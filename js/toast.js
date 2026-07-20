
class ToastMessage {
  static #id = 0;
  static MessageDiv = document.getElementById("toast_message_div");
  static queue = [];
  static ResolutionQueue = [];
  static #MessageLock = false;
  notification = null;
  static duration = 3000;
  element = null;
  static rateLimit = 5;
  rateConsumes = 0;
  static get GetId() {
    if (!this.#id) {
      this.#id = 0;
    }
    return this.#id++
  }
  // To construct a new notification ui in queue.
  static get MessageLock() {
    return this.#MessageLock;
  }
  constructor(message, heading = "Info", duration = 3000) {
    if (DebugCode === true) debugger;;
    if (message == null || message == "") {
      console.error("Empty message.");

      return;
    }
    console.log("Constructor");
    ToastMessage.MessageDiv = document.getElementById("toast_message_div");
    this.element = ToastMessage.ConstructNotification(
      message,
      heading,
      duration,
    );

    console.log(this.element);
    this.notification = this.element;
    ToastMessage.show(this);
  }
  static ResolvePromiseQueue(id = null) {
    // if (DebugCode === true) debugger;;
    if (this.queue.length > 0) {


      if (id != null && id == this.queue[0].id) {
        this.queue.shift().resolve("Resolved.");

        return;

      } else if (id == null) {
        return this.queue.shift().resolve("resolved.")
      }

    }
  }
  static ConstructNotification(message, heading, duration = 3000) {
    const id = this.GetId;
    console.log("ConstructNotification");
    if (!message) {
      console.error("Toast cannot be created by empty message.");
      return;
    }
    if (this.MessageDiv) {
      const newdiv = document.createElement("div");
      newdiv.classList.add("hide");
      newdiv.classList.add("toast_message_notification");
      const HeadingDiv = document.createElement("div");
      HeadingDiv.classList.add("toast_heading_div");
      const BodyDiv = document.createElement("div");
      BodyDiv.classList.add("toast_body_div")
      const cross = document.createElement("H6");
      cross.classList.add("close")
      const HeadingTitle = document.createElement("H6");
      HeadingTitle.classList.add("toast_heading_title")
      const Body = document.createElement("p");
      cross.innerHTML = "X";
      newdiv.appendChild(HeadingDiv);
      newdiv.appendChild(BodyDiv);
      HeadingDiv.appendChild(HeadingTitle);
      HeadingDiv.appendChild(cross);
      BodyDiv.appendChild(Body);
      Body.innerHTML = message;
      HeadingTitle.innerHTML = heading;

      if (ToastMessage.MessageDiv) ToastMessage.MessageDiv.appendChild(newdiv);

      const promise = new Promise((resolve) => {

        this.queue.push({
          resolve: resolve,
          id: id
        }
        );
      });
      console.log(
        promise
          ? "New promise for queue has been created."
          : "Promise creation failed.",
      );

      return {
        duration: duration,
        element: newdiv,
        promise: promise,
        message: message,
        heading: heading,
        id: id
      };
    }
  }
  static DisplayToastMessage(Element) {
    // if (DebugCode === true) debugger;;
    console.log("DisplayToastMessage");
    // console.log("Element", Element);
    if (Element) {
      let messagex = Element.element.message;
      if (messagex == null || messagex == "") {
        console.error("Message in toast display message is empty", messagex);
        return;
      }
      if (!Element.element.message) {
        console.error(
          "Cannot display Toast message : undefined Element.message",
        );
        return;
      }
      // console.log("Showing the message", Element.element.message);
      if (ToastMessage.MessageDiv) this.Display(Element.element);
      else ToastMessage.alertNotification(Element.message, Element.heading);
    } else {
      console.error("Empty element");
    }
  }
  static async show(Element) {
    // if (DebugCode === true) debugger;;
    ;

    console.log(this.MessageLock ? "Message Locked for " + Element.element.message : "Message Unlocked.")
    let rateConsumes = ++Element.rateConsumes
    if (rateConsumes >= ToastMessage.rateLimit) {
      ;
      alert("Error : Recursion rate limit exceded.")
      throw new Error("Recursion rate limit exceeded... Cannot process further.");

    }
    console.log("async show");
    if (!ToastMessage.MessageLock) {
      this.DisplayToastMessage(Element);
    } else {
      this.processQueue(Element);
    }

  }
  static Display(Element) {
    // if (DebugCode === true) debugger;;
    console.log("Display");
    {
      this.ResolvePromiseQueue(Element.element.id);
      let queue = ToastMessage.queue;
      this.#MessageLock = true;
      Element.element.classList.add("show");
      Element.element.classList.remove("hide");
      setTimeout(
        () => {
          console.log("Element removed.");
          Element.element.classList.remove("show");
          Element.element.classList.add("hide");
          this.#MessageLock = false;
          console.log("queue length", queue.length)
          this.ResolvePromiseQueue();
          Element.element.remove();
          console.log("Element removed of id " + Element.element.id)
        },
        Element.duration ? Element.duration : 3000,
      );
    }

  }

  static async processQueue(Element) {
    // if (DebugCode === true) debugger;;
    // ;
    console.log("ProcessQueue");
    try {
      console.log("waiting in queue. ", Element.element.message);
      await Element.element.promise;
      this.show(Element);
    } catch (e) {
      console.warn("Error occurred.");
      console.log(e);
    }
  }
  static ping() {
    console.log("Pinged successfully.");
  }

  static open(Element) {
    Element.element.classList.add("show");
    Element.element.classList.remove("hide");
  }
  static close(Element) {
    Element.element.classList.add("hide")
    Element.element.classList.remove("show")
  }
  remove() {
    this.element.remove();
  }
  static alertNotification(message, heading = "info") {
    if (message && heading) {
      alert("Toast : \n" + heading + "\n" + message);

      this.ResolvePromiseQueue();
    } else {
      console.error(
        "Invalid usage of the alertnotification : { message, heading }. message is not passed.",
      );
    }
  }
}
