const $ = (selector, scope = document) =>
  scope.querySelector(selector);

const $$ = (selector, scope = document) =>
  [...scope.querySelectorAll(selector)];

const conceptData = {
  schema: {
    icon: "🧠",
    label: "MENTAL FRAMEWORK",
    title: "Schemas",
    text:
      "Organized patterns of thought or action that learners use to understand and respond to experiences.",
    example:
      "A child may have a schema that “four-legged furry animals are dogs.”"
  },

  assimilation: {
    icon: "🧩",
    label: "FIT NEW INTO EXISTING",
    title: "Assimilation",
    text:
      "Interpreting a new experience by fitting it into an existing schema without substantially changing that schema.",
    example:
      "A child sees a cat for the first time and calls it a dog because it fits the existing four-legged-animal schema."
  },

  accommodation: {
    icon: "🛠️",
    label: "CHANGE THE FRAMEWORK",
    title: "Accommodation",
    text:
      "Changing an existing schema or creating a new one when new information cannot be adequately explained by what the learner already knows.",
    example:
      "The child learns that cats are different from dogs and creates a separate cat schema."
  },

  equilibration: {
    icon: "⚖️",
    label: "RESTORE COGNITIVE BALANCE",
    title: "Equilibration and disequilibrium",
    text:
      "Learners seek balance between what they expect and what they experience. A contradiction produces disequilibrium and may prompt schema revision.",
    example:
      "A simulation produces an unexpected result, so the learner reconsiders the rule they were using."
  },

  knowledge: {
    icon: "🔍",
    label: "THREE WAYS OF KNOWING",
    title:
      "Physical, logico-mathematical, and social knowledge",
    text:
      "Piaget distinguished knowledge built from objects, relationships constructed by the mind, and conventions learned through interaction with other people.",
    example:
      "Feeling that ice is cold is physical; understanding that 4 is greater than 2 is logico-mathematical; learning the name “ice” is social."
  }
};

const stageData = {
  sensorimotor: {
    title: "Sensorimotor Stage"
  },

  preoperational: {
    title: "Preoperational Stage"
  },

  concrete: {
    title: "Concrete Operational Stage"
  },

  formal: {
    title: "Formal Operational Stage"
  }
};

const schemaQuestions = [
  {
    text:
      "A child calls a cat a “dog” because both animals have four legs and fur.",
    answer: "assimilation",
    explanation:
      "The new animal is being fitted into an existing dog schema."
  },

  {
    text:
      "After learning that cats behave differently from dogs, the child creates a separate mental category for cats.",
    answer: "accommodation",
    explanation:
      "The learner changes the existing framework by creating a new schema."
  },

  {
    text:
      "A student who understands physical maps begins using the same ideas of symbols, scale, and direction in an online map.",
    answer: "assimilation",
    explanation:
      "The student applies an existing map schema to a new digital context."
  },

  {
    text:
      "A simulation shows that a heavier object does not always fall faster, causing a learner to revise their original rule about gravity.",
    answer: "accommodation",
    explanation:
      "The unexpected result requires the learner to reorganize the original schema."
  }
];

const stageQuestions = [
  {
    text:
      "A child pours water from a short, wide cup into a tall, thin glass and believes there is now more water.",
    answer: "preoperational",
    explanation:
      "This reflects difficulty with conservation, commonly associated with preoperational thought."
  },

  {
    text:
      "A learner systematically changes one variable at a time to determine what affects the speed of a virtual pendulum.",
    answer: "formal",
    explanation:
      "Systematic hypothesis testing is associated with formal operational reasoning."
  },

  {
    text:
      "An infant repeatedly taps an animated animal because each tap produces a sound.",
    answer: "sensorimotor",
    explanation:
      "The learner is exploring cause and effect through action and sensory feedback."
  },

  {
    text:
      "A student sorts digital shapes by colour and size and explains why an item belongs to more than one group.",
    answer: "concrete",
    explanation:
      "Classification and logical reasoning with visible objects fit concrete operational thought."
  }
];

const toolItems = [
  {
    name: "Touch-to-make-a-sound animal game",
    answer: "sensorimotor"
  },

  {
    name: "Animated symbolic storytelling activity",
    answer: "preoperational"
  },

  {
    name: "Virtual fraction manipulatives",
    answer: "concrete"
  },

  {
    name: "Open-ended climate modelling simulation",
    answer: "formal"
  }
];

const challenges = [
  {
    title: "Predict before you click.",
    text:
      "Go to the cognitive conflict simulator. Commit to an answer before running the experiment.",
    target: "#online"
  },

  {
    title: "Test your schema.",
    text:
      "Try the assimilation and accommodation challenge without returning to the definitions.",
    target: "#concepts"
  },

  {
    title: "Think like a designer.",
    text:
      "Choose one developmental stage and invent a digital learning activity that matches it.",
    target: "#stages"
  },

  {
    title: "Challenge the theory.",
    text:
      "Find one place where a rigid stage model may fail to describe a real learner.",
    target: "#limitations"
  }
];

let schemaIndex = 0;
let schemaScore = 0;
let schemaAnswered = false;

let stageIndex = 0;
let stageScore = 0;
let stageAnswered = false;

let prediction = null;

function renderConcept(key) {
  const item = conceptData[key];

  $("#conceptDisplay").innerHTML = `
    <div class="concept-icon">${item.icon}</div>

    <p class="concept-label">
      ${item.label}
    </p>

    <h3>${item.title}</h3>

    <p>${item.text}</p>

    <div class="concept-example">
      <strong>Example:</strong>
      ${item.example}
    </div>
  `;
}

function renderSchemaQuestion() {
  schemaAnswered = false;

  const question = schemaQuestions[schemaIndex];

  $("#schemaScenario").textContent = question.text;

  $("#schemaFeedback").textContent = "";
  $("#schemaFeedback").className = "feedback";

  $("#nextSchema").classList.add("hidden");

  $$("[data-schema-answer]").forEach((button) => {
    button.disabled = false;
    button.classList.remove("selected");
  });
}

function renderStageQuestion() {
  stageAnswered = false;

  const question = stageQuestions[stageIndex];

  $("#stageScenario").textContent = question.text;

  $("#stageFeedback").textContent = "";
  $("#stageFeedback").className = "feedback";

  $("#nextStageQuestion").classList.add("hidden");

  $("#stageChoices").innerHTML = Object.entries(stageData)
    .map(([key, value]) => {
      return `
        <button data-stage-answer="${key}">
          ${value.title.replace(" Stage", "")}
        </button>
      `;
    })
    .join("");
}

function renderToolMatcher() {
  $("#toolMatcher").innerHTML = toolItems
    .map((item, index) => {
      return `
        <div class="tool-item">
          <label for="tool-${index}">
            ${item.name}
          </label>

          <select
            id="tool-${index}"
            data-tool-index="${index}"
          >
            <option value="">
              Choose a stage
            </option>

            <option value="sensorimotor">
              Sensorimotor
            </option>

            <option value="preoperational">
              Preoperational
            </option>

            <option value="concrete">
              Concrete operational
            </option>

            <option value="formal">
              Formal operational
            </option>
          </select>
        </div>
      `;
    })
    .join("");
}

function showToast(message) {
  const toast = $("#toast");

  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

$$(".concept-tab").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".concept-tab").forEach((tabButton) => {
      tabButton.classList.remove("active");
      tabButton.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    renderConcept(button.dataset.concept);
  });
});

$$("[data-schema-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    if (schemaAnswered) {
      return;
    }

    schemaAnswered = true;

    const question = schemaQuestions[schemaIndex];

    const correct =
      button.dataset.schemaAnswer === question.answer;

    button.classList.add("selected");

    if (correct) {
      schemaScore += 1;
    }

    $("#schemaScore").textContent = schemaScore;

    const feedback = $("#schemaFeedback");

    feedback.textContent = `${
      correct ? "Correct." : "Not quite."
    } ${question.explanation}`;

    feedback.classList.add(
      correct ? "correct" : "incorrect"
    );

    $$("[data-schema-answer]").forEach((answerButton) => {
      answerButton.disabled = true;
    });

    $("#nextSchema").textContent =
      schemaIndex === schemaQuestions.length - 1
        ? "Restart challenge ↻"
        : "Next scenario →";

    $("#nextSchema").classList.remove("hidden");
  });
});

$("#nextSchema").addEventListener("click", () => {
  if (schemaIndex === schemaQuestions.length - 1) {
    schemaIndex = 0;
    schemaScore = 0;

    $("#schemaScore").textContent = "0";
  } else {
    schemaIndex += 1;
  }

  renderSchemaQuestion();
});

$("#stageChoices").addEventListener("click", (event) => {
  const button = event.target.closest(
    "[data-stage-answer]"
  );

  if (!button || stageAnswered) {
    return;
  }

  stageAnswered = true;

  const question = stageQuestions[stageIndex];

  const correct =
    button.dataset.stageAnswer === question.answer;

  button.classList.add("selected");

  if (correct) {
    stageScore += 1;
  }

  $("#stageScore").textContent = stageScore;

  const feedback = $("#stageFeedback");

  feedback.textContent = `${
    correct ? "Correct." : "Not quite."
  } ${question.explanation}`;

  feedback.classList.add(
    correct ? "correct" : "incorrect"
  );

  $$("#stageChoices button").forEach(
    (choiceButton) => {
      choiceButton.disabled = true;
    }
  );

  $("#nextStageQuestion").textContent =
    stageIndex === stageQuestions.length - 1
      ? "Restart challenge ↻"
      : "Next scenario →";

  $("#nextStageQuestion").classList.remove("hidden");
});

$("#nextStageQuestion").addEventListener("click", () => {
  if (stageIndex === stageQuestions.length - 1) {
    stageIndex = 0;
    stageScore = 0;

    $("#stageScore").textContent = "0";
  } else {
    stageIndex += 1;
  }

  renderStageQuestion();
});

$$("[data-prediction]").forEach((button) => {
  button.addEventListener("click", () => {
    prediction = button.dataset.prediction;

    $$("[data-prediction]").forEach(
      (predictionButton) => {
        predictionButton.classList.remove("selected");
      }
    );

    button.classList.add("selected");

    $("#predictionStatus").textContent =
      "Prediction locked. Run the experiment.";

    $("#runExperiment").disabled = false;
  });
});

$("#runExperiment").addEventListener("click", () => {
  const heavyBall = $("#heavyBall");
  const lightBall = $("#lightBall");

  heavyBall.classList.remove("drop");
  lightBall.classList.remove("drop");

  void heavyBall.offsetWidth;

  heavyBall.classList.add("drop");
  lightBall.classList.add("drop");

  $("#runExperiment").disabled = true;

  window.setTimeout(() => {
    const correct = prediction === "same";

    $("#predictionStatus").textContent = correct
      ? "Your prediction matched the model: they landed together. What principle explains the result?"
      : "The model shows them landing together. That conflict is the point: does your original schema need adjustment?";

    $("#runExperiment").disabled = false;
    $("#runExperiment").textContent = "Run again";
  }, 1250);
});

$("#checkTools").addEventListener("click", () => {
  let score = 0;
  let unanswered = 0;

  toolItems.forEach((item, index) => {
    const select = $(
      `[data-tool-index="${index}"]`
    );

    if (!select.value) {
      unanswered += 1;
    }

    if (select.value === item.answer) {
      score += 1;
    }

    select.style.borderColor =
      select.value === item.answer
        ? "#147a5d"
        : "#d84949";
  });

  $("#toolScore").textContent = score;

  const feedback = $("#toolFeedback");

  feedback.className = `feedback ${
    score === toolItems.length
      ? "correct"
      : "incorrect"
  }`;

  if (unanswered > 0) {
    feedback.textContent =
      `You still have ${unanswered} unmatched ` +
      `tool${unanswered === 1 ? "" : "s"}.`;

    return;
  }

  if (score === toolItems.length) {
    feedback.textContent =
      "Excellent. All four tools are matched to the most appropriate stage.";

    return;
  }

  feedback.textContent =
    `${score} of ${toolItems.length} matched. ` +
    "Reconsider the level of abstraction and the kind of interaction each tool requires.";
});

$$("[data-myth]").forEach((button) => {
  button.addEventListener("click", () => {
    const correct =
      button.dataset.myth === "no";

    const feedback = $("#mythFeedback");

    feedback.className =
      `feedback ${correct ? "correct" : "incorrect"}`;

    feedback.textContent = correct
      ? "Exactly. The stages are a useful developmental framework, but performance overlaps and varies by task, learner, culture, experience, and support."
      : "That interpretation is too rigid. Age can guide design, but it does not determine every learner's exact ability in every context.";
  });
});

const modal = $("#challengeModal");

let selectedChallenge = challenges[0];

$("#randomChallenge").addEventListener("click", () => {
  selectedChallenge =
    challenges[
      Math.floor(Math.random() * challenges.length)
    ];

  $("#challengeTitle").textContent =
    selectedChallenge.title;

  $("#challengeText").textContent =
    selectedChallenge.text;

  modal.classList.add("open");

  modal.setAttribute("aria-hidden", "false");
});

$("#closeChallenge").addEventListener(
  "click",
  closeModal
);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

$("#goToChallenge").addEventListener("click", () => {
  closeModal();

  $(selectedChallenge.target).scrollIntoView({
    behavior: "smooth"
  });
});

const menuButton = $("#menuButton");
const mainNav = $("#mainNav");

menuButton.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    String(open)
  );
});

$$(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});

window.addEventListener(
  "scroll",
  () => {
    const documentElement = document.documentElement;

    const progress =
      documentElement.scrollTop /
      (
        documentElement.scrollHeight -
        documentElement.clientHeight
      );

    $("#progressBar").style.width =
      `${Math.min(progress * 100, 100)}%`;

    const sections = [
      ...$$("main section[id]")
    ].reverse();

    const current = sections.find((section) => {
      return (
        section.getBoundingClientRect().top <= 150
      );
    });

    $$(".main-nav a").forEach((link) => {
      link.classList.toggle(
        "active",
        Boolean(
          current &&
          link.getAttribute("href") ===
            `#${current.id}`
        )
      );
    });
  },
  {
    passive: true
  }
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

$$(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

renderSchemaQuestion();
renderStageQuestion();
renderToolMatcher();
