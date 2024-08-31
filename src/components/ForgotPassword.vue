<script>
import socket from '../socket';
import Input from './Input.vue';

export default {
    data() {
        return {
            password: '',
            error: ''
        }
    },
    components: {
        Input
    },
    created() {
        if (!this.$route.query.token || !this.$route.query.id) {
            this.$router.push('/login');
        }
        socket.connect();
    },
    methods: {
        onSubmit() {
            socket.emit('forgot-password', { id: this.$route.query.id, token: this.$route.query.token, password: this.password }, data => {
                if (data.status == 'fail') {
                    this.error = data.message || null
                } else {
                    this.error = null
                    this.$router.push('/login')
                }
            });
        }
    },
    unmounted() {
        socket.off('forgot-password');
        socket.disconnect();
    }
}
</script>

<template>
    <div class="relative flex flex-col justify-center h-[calc(100vh-74px)] overflow-hidden">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
            <h1 class="text-3xl font-semibold text-center text-gray-700">Forgot Password</h1>
            <form @submit.prevent="onSubmit">
                <div class="mb-2">
                    <Input :type="`password`" :class="`w-full input input-bordered`" :field-name="`password`"
                        :error="error" @response="(val) => password = val" />
                </div>
                <button class="btn-neutral btn btn-block" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>