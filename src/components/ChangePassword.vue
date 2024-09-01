<script>
import socket from '../socket.js';
import Input from './Input.vue'

export default {
    data() {
        return {
            password: '',
            error: '',
            message: ''
        }
    },
    methods: {
        onSubmit() {
            socket.emit('password-changing', { password: this.password, to: this.$cookies.get('username') }, data => {
                if (data.status == 'fail') {
                    this.error = data.message || null
                } else {
                    this.error = null
                }
            });
        },
        onClick() {
            this.$router.push('/change-password');
        },
        logout() {
            socket.off('connect');
            socket.off('disconnect')
            socket.off('password-changing');
            socket.off('forgot-password');
            socket.disconnect(true);
            this.$cookies.remove('token')
            this.$cookies.remove('email')
            this.$cookies.remove('username')
            this.$router.push('/login')
        }
    },
    mounted() {
        socket.auth = { username: this.$cookies.get('username') };
        socket.connect();
        socket.on('password-changing', data => {
            this.$store.commit('notifications', {
                val: 1
            })
            console.log(data.count);
            this.message = `Password has been changed!`
            my_modal_1.showModal();
        });
        socket.on('forgot-password', data => {
            this.message = `Someone reset this account password`
            my_modal_1.showModal();
            socket.disconnect(true);
            this.$cookies.remove('token')
            this.$cookies.remove('email')
            this.$cookies.remove('username')
            setTimeout(() => {
                this.$router.push('/login')
            }, 3000);
        })
    },
    unmounted() {
        socket.disconnect();
        socket.off('password-changing');
        socket.off('forgot-password');
    },
    components: {
        Input
    }
}
</script>

<template>
    <div class="relative flex flex-col justify-center h-[calc(100vh-74px)] overflow-hidden">
        <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
            <h1 class="text-3xl font-semibold text-center text-gray-700">Password Change</h1>
            <form @submit.prevent="onSubmit">
                <div class="mb-2">
                    <Input :type="`password`" :class="`w-full input input-bordered`" :field-name="`password`"
                        :error="error" @response="(val) => password = val" />
                </div>
                <button class="btn-neutral btn btn-block" type="submit">Submit</button>
            </form>
        </div>
    </div>
    <Teleport to="#dropdown-item">
        <li>
            <button @click="onClick">Change Password</button>
        </li>
        <li>
            <button @click="logout">Logout</button>
        </li>
    </Teleport>
    <dialog id="my_modal_1" class="modal">
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