export const StoryBrandPlanSection = {
  name: 'StoryBrandPlanSection',
  props: {
    plan: { type: Object, required: true },
  },
  template: `
    <section class="section-block section-plan">
      <span class="editorial-kicker">{{ plan.kicker }}</span>
      <h2 class="section-title">{{ plan.title }}</h2>
      <p class="section-lead">{{ plan.lead }}</p>

      <div class="plan-steps-grid">
        <div
          v-for="(st, idx) in plan.steps"
          :key="idx"
          class="plan-step-card"
        >
          <div class="plan-step-num">{{ st.num }}</div>
          <div class="plan-step-content">
            <h3 class="plan-step-title">{{ st.title }}</h3>
            <p class="plan-step-desc">{{ st.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
};
