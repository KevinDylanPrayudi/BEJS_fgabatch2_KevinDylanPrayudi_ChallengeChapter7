<script>
import Input from './Input.vue';
import socket from '../socket.js';

export default {
    data() {
        return {
            email: '',
            error: '',
            message: ''
        }
    },
    methods: {
        onSubmit() {
            my_modal_1.showModal()
            socket.emit('pre-forgot-password', { email: this.email }, data => {
                my_modal_1.close()
                if (data.status == 'fail') {
                    this.error = data.message || null
                } else {
                    this.error = null
                }
            });
        }
    },
    components: {
        Input
    },
    created() {
        socket.connect();
        socket.on('pre-forgot-password', data => {
            my_modal_2.showModal()
            this.message = data.message
        })
    },
    unmounted() {
        socket.disconnect();
        socket.off('pre-forgot-password');
    }
}
</script>

<template>
    <div class="relative flex flex-col justify-center h-[calc(100vh-74px)] overflow-hidden">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
            <h1 class="text-3xl font-semibold text-center text-gray-700">Login</h1>
            <form class='space-y-4' @submit.prevent="onSubmit">
                <div>
                    <Input :error="error" :type="`text`" :class="`w-full input input-bordered`" :field-name="`email`"
                        @response="(val) => email = val" />
                </div>
                <button class="btn-neutral btn btn-block" type="submit">Submit</button>
            </form>
        </div>
    </div>
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Waiting...</h3>
            <p class="py-4">Please wait. We are processing your request.</p>
            <div class="modal-action">
            </div>
        </div>
    </dialog>
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