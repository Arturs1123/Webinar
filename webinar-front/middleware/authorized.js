export default function ({ $auth, redirect }) {
  if (!localStorage.getItem("token")) {
    return redirect('/login');
  }
}
