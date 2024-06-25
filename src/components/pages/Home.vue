<template>
  <section class="home-body">
    <div class="homeImage-container" id="carousel">
      <img
        class="homeImage"
        src="../../assets/images/elements/homeImage.png"
        alt="Home Image"
      />
    </div>

    <h1 class="header-image">The World Of Guns</h1>

    <div class="p-first-block">
      <img class="gun-img" src="../../assets/images/elements/g2.webp" />
      <p>
        Welcome to the World of Guns! Here you can find all the information you
        need about guns and modifications. You can also create an account and
        save your favourite guns and modifications. If you are a gun enthusiast,
        this is the right place for you!
      </p>
    </div>

    <div class="p-second-block">
      <img class="gun-img" src="../../assets/images/elements/g1.jpg" />
      <p>
        The history of firearms is a fascinating journey that traces back to the
        10th century, with the invention of gunpowder in China. This remarkable
        discovery led to the development of the first firearms, which were
        simple, hand-held cannons. Over the centuries, firearms evolved
        dramatically from the rudimentary matchlock muskets of the 15th century
        to the precision-engineered flintlocks of the 18th century. The 19th
        century witnessed a revolutionary leap with the introduction of
        cartridge-based ammunition, paving the way for the modern era of
        firearms. This era saw rapid advancements, including the development of
        repeating rifles, automatic pistols, and eventually, the sophisticated
        assault rifles of the 20th century. Each epoch in the history of
        firearms not only reflects technological innovation but also the
        changing dynamics of warfare, hunting, and sport shooting, marking an
        indelible impact on society and culture across the globe.
      </p>
    </div>

    <h2>Practical Information</h2>

    <div class="QandA-info-container">
      <div
        v-for="qaa in questionAndAnswers"
        :key="qaa.questionAndAnswerId"
        class="QandA-info-item"
      >
        <img
          class="QandA-info-sign toggle-sign"
          :src="
            isAnswerVisible(qaa.questionAndAnswerId)
              ? '../../src/assets/images/elements/-sign.png'
              : '../../src/assets/images/elements/+sign.png'
          "
          alt="Toggle Answer"
          @click="toggleAnswer(qaa.questionAndAnswerId)"
        />
        <p class="QandA-info-text">
          {{ qaa.question }}
        </p>
        <div
          class="QandA-info-answer"
          v-show="isAnswerVisible(qaa.questionAndAnswerId)"
        >
          {{ qaa.answer }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "@/assets/CSS/home.css";
import { useQaAStore } from "@/stores/QaA";
import { onMounted, ref, computed } from "vue";

export default {
  name: "Home",
  setup() {
    const qaaStore = useQaAStore();
    const visibleAnswers = ref([]);

    onMounted(() => {
      qaaStore.fetchQuestionAndAnswers();
    });

    const toggleAnswer = (id) => {
      if (visibleAnswers.value.includes(id)) {
        visibleAnswers.value = visibleAnswers.value.filter(
          (visibleId) => visibleId !== id
        );
      } else {
        visibleAnswers.value.push(id);
      }
    };

    const isAnswerVisible = (id) => {
      return visibleAnswers.value.includes(id);
    };

    return {
      questionAndAnswers: computed(() => qaaStore.questionAndAnswers),
      loading: computed(() => qaaStore.loading),
      error: computed(() => qaaStore.error),
      toggleAnswer,
      isAnswerVisible,
    };
  },
};
</script>
