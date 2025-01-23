import "./App.css";
import Card from "./components/card/Card";

function App() {
  let myInfo = {"name": "abc"};
  return (
    <>
      <h1 className="text-3xl font-bold underline">Test Tailwind</h1>
      <ul role="list" className="divide-y divide-gray-100 p-6">
        <Card username="John" email="john@google.com"/>
        <Card username="Alice" email="alice@google.com"/>
        <Card username="Ram" email="ram@google.com" image="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg" myDetails = {[1,2,3,4]}/>
      </ul>
    </>
  );
}

export default App;
