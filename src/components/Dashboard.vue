<script>
import socket from '../socket.js';

export default {
    data() {
        return {
            message: 'Dashboard'
        }
    },
    async beforeMount() {
        fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.$cookies.get('token')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == 'fail') {
                    this.$cookies.remove('token')
                    this.$router.push('/login')
                }
                this.$cookies.set('username', data.data.id);
                this.$cookies.set('email', data.data.email);
                this.$store.commit('username', {
                    val: data.data.email
                })
                console.log(`this is before mounted ${this.$cookies.get('email')}`)
                socket.auth = { username: data.data.id };
                socket.connect();
            })


        socket.on('password-changing', data => {
            this.$store.commit('notifications', {
                val: 1
            })
        })

        socket.on('forgot-password', data => {
            my_modal_1.showModal()
            socket.off('forgot-password');
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
    methods: {
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
    }
}
</script>


<template>
    <h1 class="font-bold">{{ message }}</h1>
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
            <h3 class="text-lg font-bold">Reset Password</h3>
            <p class="py-4">Someone reset this account password</p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>
    </dialog>
</template>