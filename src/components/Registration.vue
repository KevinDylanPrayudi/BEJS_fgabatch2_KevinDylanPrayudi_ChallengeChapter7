<script>
import Input from './Input.vue';
import socket from '../socket.js';

export default {
    data() {
        return {
            email: '',
            error: '',
            firstName: '',
            lastName: '',
            password: '',
            message: ''
        }
    },
    components: {
        Input
    },
    methods: {
        onSubmit() {
            socket.connect();
            socket.emit('registration', { firstName: this.firstName, lastName: this.lastName, email: this.email, password: this.password }, data => {
                if(data.status == 'fail') {
                    this.error = data.message
                } else {
                    this.error = null
                    this.message = data.message
                    my_modal_2.showModal()
                    this.$router.push('/login')
                }
            });
        }
    },
    unmounted() {
        socket.disconnect();
        socket.off('registration');
    }
}
</script>

<template>
    <div class="relative flex flex-col justify-center h-[calc(100vh-74px)] overflow-hidden">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
            <h1 class="text-3xl font-semibold text-center text-gray-700">Registration</h1>
            <form @submit.prevent="onSubmit">
                {{ error }}
                <div class="mb-2">
                    <Input :type="`text`" :class="`w-full input input-bordered`" :field-name="`firstName`"
                        @response="(val) => firstName = val" />
                </div>
                <div class="mb-2">
                    <Input :type="`text`" :class="`w-full input input-bordered`" :field-name="`lastName`"
                        @response="(val) => lastName = val" />
                </div>
                <div class="mb-2">
                    <Input :type="`text`" :class="`w-full input input-bordered`" :field-name="`email`"
                        @response="(val) => email = val" />
                </div>
                <div class="mb-2">
                    <Input :type="`password`" :class="`w-full input input-bordered`" :field-name="`password`"
                        @response="(val) => password = val" />
                </div>
                <button class="btn-neutral btn btn-block" type="submit">Submit</button>
            </form>
        </div>
    </div>
    <dialog id="my_modal_2" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Response</h3>
            <p class="py-4"> {{ message }}</p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>