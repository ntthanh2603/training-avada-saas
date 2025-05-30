import admin from "firebase-admin";
import serverAccount from "../../../../../serviceAccount.json" assert { type: "json" };

const app = admin.initializeApp({
  credential: admin.credential.cert(serverAccount),
});

const db = admin.firestore(app).collection("todo");

const addTodo = async (todo) => {
  const docRef = db.doc(todo.id);
  await docRef.set(todo);
  return { id: docRef.id, ...todo };
};

const getTodos = async () => {
  const snapshot = await db.get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getTodo = async (id) => {
  const docRef = db.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    throw new Error("Todo not found");
  }
  return { id: doc.id, ...doc.data() };
};

const updateTodo = async (id, todo) => {
  const docRef = db.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    throw new Error("Todo not found");
  }
  await docRef.update(todo);
  return { id: doc.id, ...todo };
};
const deleteTodo = async (id) => {
  const docRef = db.doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    throw new Error("Todo not found");
  }
  await docRef.delete();
  return { id: doc.id, ...doc.data() };
};

export { addTodo, getTodos, getTodo, updateTodo, deleteTodo };
