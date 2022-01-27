import Vue from "vue";

export default {
    SET_STEP(state, service) {
        Vue.set(state, "steps", service);
    },

    UPDATE_STEP(state, step) {
        const index = state.steps.findIndex(
            (x) => x.id === step.id
        );
        Vue.set(state.steps, index, step);
    },

    REMOVE_STEP(state, id) {
        const Index = state.steps.findIndex((x) => x.id === id);
        Vue.delete(state.steps, Index);
    },

    ADD_STEP(state, step) {
        Vue.set(
            state.steps,
            state.step.length,
            step
        );
    },

    SET_LOADING(state, value) {
        state.loading = value;
    },

    MOVE_UP(state, stepId) {
        let stepIndex = state.steps.findIndex((step) => step.id === stepId);
        let prevStepIndex = stepIndex - 1;

        let prevStep = state.steps[prevStepIndex];

        Vue.set(state.steps, prevStepIndex, state.steps[stepIndex]);
        Vue.set(state.steps, stepIndex, prevStep);
    },

    MOVE_DOWN(state, stepId) {
        let stepIndex = state.steps.findIndex((step) => step.id === stepId);
        let nextStepIndex = stepIndex + 1;

        let nextStep = state.steps[nextStepIndex];

        Vue.set(state.steps, nextStepIndex, state.steps[stepIndex]);
        Vue.set(state.steps, stepIndex, nextStep);
    },
}

