// Home page animation

const homeTimeline = gsap.timeline();

homeTimeline.from("#home-card", {
  opacity: 0,
  scale: 0.2,
  duration: 0.8,
  delay: 0.3,
});

homeTimeline.from("#home-card div", {
  opacity: 0,
  duration: 1.8,
  stagger: 0.4,
  y: -20,
});

homeTimeline.from("#qr", {
  opacity: 0,
  duration: 0.6,
});

// Cursor

const body = document.getElementById("main");

document.addEventListener("mousemove", (dets) => {
  gsap.to("#cursor", {
    x: dets.x,
    y: dets.y,
    ease: "back.out(1.7)",
    duration: 0.3,
  });
});

body.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("box")) {
    gsap.to("#cursor", {
      height: 20,
      width: 20,
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    });
  }
});

body.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("box")) {
    gsap.to("#cursor", {
      height: 10,
      width: 10,
      backgroundColor: "rgba(0, 0, 0)",
    });
  }
});

// Join, login, addEvent pageeeeeeeee

const formTimeline = gsap.timeline();

formTimeline.from("#bbps-logo", {
  opacity: 0,
  duration: 0.2,
  delay: 0.8,
});

formTimeline.from("#heading", {
  scale: 0.2,
  opacity: 0,
  duration: 0.8,
  delay: 0.4,
});

formTimeline.from("form div", {
  opacity: 0,
  duration: 0.5,
  stagger: 0.2,
});

// Logout

gsap.from("#logout", {
  opacity: 0,
  duration: 0.9,
  scale: 0.9,
  delay: 0.4,
});

// Event, network and about page

gsap.registerPlugin(ScrollTrigger);

const displayTimeline = gsap.timeline();

displayTimeline.from("header div", {
  opacity: 0,
  stagger: 0.4,
  y: -30,
  duration: 0.8,
});

displayTimeline.from("#display-heading", {
  duration: 1,
  opacity: 0,
  scale: 0.9,
});

displayTimeline.from("#add-event", {
  duration: 0.6,
  opacity: 0,
  opacity: 0,
});

displayTimeline.from("#message-div", {
  opacity: 0,
  duration: 0.6,
  delay: 0.2,
});

// notification

displayTimeline.from("#notification-card", {
  opacity: 0,
  duration: 0.4,
  delay: 0.2,
});

document.getElementById("closeNotification").addEventListener("click", () => {
  gsap.to("#notification-card", {
    display: none,
    duration: 0.8,
    opacity: 0,
  });
});

// creators

gsap.utils.toArray(".creator").forEach((creator) => {
  gsap.from(creator, {
    opacity: 0.1,
    duration: 1,
    delay: 0.4,
    scrollTrigger: {
      trigger: creator,
      start: "top 80%",
      end: "top 50%",
      scrub: 2,
    },
  });
});

// Profile page animations
gsap.from("#profile-card", {
  opacity: 0,
  scale: 0.2,
  duration: 0.8,
  delay: 0.3,
});
