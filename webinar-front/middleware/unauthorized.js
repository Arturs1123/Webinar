export default function ({ $auth, redirect }) {
  if (localStorage.getItem("user")) {
    return redirect('/');
  }
}
