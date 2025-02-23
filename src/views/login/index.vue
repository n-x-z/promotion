<script>
    import { defineComponent, reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    export default defineComponent({
        setup() {
            const formRef = ref();
            const router = useRouter();
            const checked = ref(false);
            const formState = reactive({
                pass: '',
                checkPass: ''
            });
            let validatePass = async (rule, value) => {
                if (value === '') {
                    return Promise.reject('Please input the password');
                } else {
                    if (formState.checkPass !== '') {
                        formRef.value.validateFields('checkPass');
                    }
                    return Promise.resolve();
                }
            };
            let validatePass2 = async (rule, value) => {
                if (value === '') {
                    return Promise.reject('Please input the password again');
                } else {
                    return Promise.resolve();
                }
            };
            const rules = {
                pass: [
                    {
                        required: true,
                        validator: validatePass,
                        trigger: 'change',
                    },
                ],
                checkPass: [
                    {
                        validator: validatePass2,
                        trigger: 'change',
                    },
                ]
            };
            const handleFinish = values => {
                router.push('/home')
                console.log(values, formState);
            };
            const handleFinishFailed = errors => {
                console.log(errors);
            };
            const resetForm = () => {
                formRef.value.resetFields();
            };
            return {
                formState,
                formRef,
                checked,
                rules,
                handleFinishFailed,
                handleFinish,
                resetForm,
            };
        },
    });
</script>
<template>
  <div class="login">

   <div class="login-content ">
        <div class="login-image">
          <img src="../../assets/images/login.jpeg"/>
        </div>
        <div class="login-form">
            <h2>{{$t('updatePromotion.promotionManagement')}}</h2>
            <div class="login-form-title">{{$t('common.userLogin')}}</div>
            <a-form
                    name="custom-validation"
                    ref="formRef"
                    :model="formState"
                    :rules="rules"
                    style="margin-top: 20px"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed"
            >
                <a-form-item :wrapper-col="{ span: 24 }" has-feedback label="" name="phone">
                    <a-input  v-model:value="formState.phone" size="large" type="text" autocomplete="off" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 24 }" has-feedback label="" name="password">
                    <a-input-password v-model:value="formState.password" size="large" type="password" autocomplete="off" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 24 }">
                    <a-button style="width: 100%;margin-top: 20px" size="large" type="primary" html-type="submit">{{$t('common.login')}}</a-button>
                </a-form-item>
            </a-form>

       </div>
    </div>
  </div>
</template>

<style>
  .login{
    height: 100vh;
    width: 100%;
    position: relative;
  }

  .login-content{
    width: 1000px;
    height: 600px;
      border-radius: 10px;
      box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
  }
  .login-form-title{
      font-size: 16px;
      margin-top: 40px;
  }
  .login-image{
    width: 80%;
  }
  .login-form{
      position: absolute;
      right: 0;
      border-radius: 10px;
      height: 100%;
      background: #fff;
      width: 400px;

    padding: 40px 30px;
  }
  .login-image img{
    width: 100%;
    height: 100%;
  }
  .login-button button{
    width: 100%;
  }
</style>
