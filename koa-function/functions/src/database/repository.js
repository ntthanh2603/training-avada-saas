import admin from "firebase-admin";
import serverAccount from "./serviceAccount.json" assert { type: "json" };

const app = admin.initializeApp({
  credential: admin.credential.cert(serverAccount),
});

const db = admin.firestore(app).collection("todo");

const add = async (data) => {
  const docRef = db.doc();

  const documentData = {
    id: data.id || "",
    title: data.title || "",
    isComplete: Boolean(data.isComplete),
  };

  await docRef.set(documentData);
  return data;
};
const getAll = async () => {
  const snapshot = await db.get();

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const remove = async (id) => {
  console.log("Removing document with id:", id);
  const querySnapshot = await db.where("id", "==", id).limit(1).get();

  if (querySnapshot.empty) {
    throw new Error(`Document with id ${id} not found`);
  }

  const docToDelete = querySnapshot.docs[0];
  await docToDelete.ref.delete();

  return `Document with id ${id} deleted successfully`;
};
const update = async (id, data) => {
  const querySnapshot = await db.where("id", "==", id).limit(1).get();

  if (querySnapshot.empty) {
    throw new Error(`Document with id ${id} not found`);
  }

  const docToUpdate = querySnapshot.docs[0];
  const currentData = docToUpdate.data();

  const updateData = {
    ...currentData,
    title: data.title ?? currentData.title,
    isComplete: data.isComplete ?? currentData.isComplete,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await docToUpdate.ref.update(updateData);

  const { updatedAt, ...returnData } = updateData;
  return {
    id: docToUpdate.id,
    ...returnData,
  };
};

export { add, getAll, update, remove };
