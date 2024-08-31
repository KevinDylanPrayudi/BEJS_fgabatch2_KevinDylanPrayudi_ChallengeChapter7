<script>
    export default {
        data() {
            return {
                value: ''
            }
        },
        props: {
            fieldName: String,
            error: String,
            class: String,
            type: String
        },
        emits: ['response'],
        watch: {
            value(newVal) {
                this.$emit('response', newVal)
            }
        }
    }
</script>

<template>
    <label class="label" :for="fieldName">
        <span class="text-base label-text">{{ fieldName }}</span>
    </label>
    <input :id='fieldName' :class :type v-model='value' />
    <p v-if="error">{{ error }}</p>
</template>