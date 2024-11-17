import UserAuthForm from './components/user-auth-form';

export default function SignInPage() {
  return (
    <div className="relative grid h-screen flex-col justify-center bg-gradient-to-b from-secondary to-primary md:grid md:items-center lg:max-w-none lg:px-0">
      <div className="flex items-center rounded-xl bg-background p-8 shadow-lg">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center pb-6">
              <img src="/combiphar.png" alt="combiphar" className="h-10" />
              {/* <img
                src="/combiphar_white.png"
                alt="combiphar"
                className="hidden h-10 dark:block"
              /> */}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-sm text-muted-foreground">
              Masukkan email dan password anda
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
