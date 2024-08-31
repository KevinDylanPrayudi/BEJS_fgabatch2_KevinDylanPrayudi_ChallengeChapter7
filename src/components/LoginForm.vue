<script>
import Input from './Input.vue';

export default {
  data() {
    return {
      email: '',
      error: '',
      password: '',
    }
  },
  components: {
    Input
  },
  methods: {
    onSubmit() {
      fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.status !== 'fail') {
            this.$cookies.set('token', `bearer ${data.data.token}`);
            this.$router.push('/dashboard');
          } else {
            this.error = data.message;
          }
        })
    }
  }
}
</script>

<template>
  <div class="relative flex flex-col justify-center h-[calc(100vh-74px)] overflow-hidden">
    <div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
      <h1 class="text-3xl font-semibold text-center text-gray-700">Login</h1>
      <form class='space-y-4' @submit.prevent="onSubmit">
        {{ error }}
        <div>
          <Input :type="`text`" :class="`w-full input input-bordered`" :field-name="`email`" @response="(val) => email = val" />
        </div>
        <div>
          <Input :type="`password`" :class="`w-full input input-bordered`" :field-name="`password`" @response="(val) => password = val" />
        </div>
        <button class="btn-neutral btn btn-block" type="submit">Submit</button>
      </form>
      <RouterLink to="/forgot-password" class="text-xs text-gray-600 hover:underline hover:text-blue-600 block mt-2">Forget Password?</RouterLink>
      <p class="text-xs inline">Do you account? No, u can sign up </p>
      <RouterLink to="/registration" class="text-xs text-gray-600 hover:underline hover:text-blue-600">Here</RouterLink>
    </div>
  </div>
</template>