"use client";
import { IconUser } from "@tabler/icons-react";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, updateProfile, deleteUser } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button, TextInput, Group, Text, Modal, Alert, rem, Progress } from "@mantine/core";
import { IconUpload, IconPhoto, IconX, IconEdit } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { db, storage } from "@config/FirebaseConfig";
import { doc, collection, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";

const Dashboard: React.FC = () => {
  const auth = getAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");
  const [deleteConfirm, setDeleteConfirm] = useState<string>("");
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [dropzoneOpened, { open: openDropzoneModal, close: closeDropzoneModal }] = useDisclosure(false);
  const [alertSubmit, setAlertSubmit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName ?? "");
        setPhotoURL(user.photoURL ?? "");
      } else {
        router.push("/forbidden");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleUpdateProfile = async () => {
    if (user) {
      try {
        // Update the Firebase Auth profile
        await updateProfile(user, { displayName, photoURL });

        // Ensure the user object is updated after the profile update
        const refreshedUser = getAuth().currentUser;
        if (refreshedUser) {
          setUser(refreshedUser);
          setDisplayName(refreshedUser.displayName ?? "");
          setPhotoURL(refreshedUser.photoURL ?? "");
        }

        // Update user information in Firestore
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          displayName,
          photoURL,
        });

        console.log("User profile updated in Firestore");

        setAlertSubmit(true);
        setTimeout(() => {
          setAlertSubmit(false);
        }, 1000);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (user && deleteConfirm === "DELETE") {
      const userCommentsQuery = query(collection(db, "RatingDosen"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(userCommentsQuery);
      const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

      try {
        await Promise.all(deletePromises);
        const userDocRef = doc(db, "users", user.uid);
        await deleteDoc(userDocRef);
        await deleteUser(user);
        closeModal();
        router.push("/");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    } else {
      alert('Ketik "DELETE" untuk mengkonfirmasi penghapusan akun');
    }
  };

  const handleImageUpload = (files: File[]) => {
    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    setError(null); // Reset error state if file size is valid
    const storageRef = ref(storage, `userProfilePics/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);
    setProgress(0);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Error uploading image:", error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setPhotoURL(downloadURL);
        setUploading(false);
      }
    );
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button onClick={openDropzoneModal}>
          {photoURL ? <Image src={photoURL} alt="Profile Preview" className="w-[200px] h-[200px] object-cover rounded-[50%]" width={200} height={200} /> : <IconUser size={200} className="text-gray-500" />}
          <IconEdit size={24} className="translate-x-[180px] -translate-y-[40px]" />
        </button>

        <Modal opened={dropzoneOpened} onClose={closeDropzoneModal} title="Upload Foto Profil" centered>
          {error && (
            <div role="alert" className="rounded my-4 border-s-4 border-red-500 bg-red-50 p-4">
              <strong className="block font-medium text-red-800"> Upload Gagal </strong>
              <p className="mt-2 text-sm text-red-700">{error}</p>
            </div>
          )}
          <Dropzone onDrop={handleImageUpload} onReject={(files) => setError("File size exceeds 5MB limit. Please upload a smaller file.")} maxSize={5 * 1024 * 1024} accept={IMAGE_MIME_TYPE}>
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
              <Dropzone.Accept>
                <IconUpload style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }} stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-dimmed)" }} stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed 5MB
                </Text>
              </div>
            </Group>
          </Dropzone>
          {uploading && (
            <Progress.Root size="lg" mt="md">
              <Progress.Section value={progress}>
                <Progress.Label>{Math.round(progress)}%</Progress.Label>
              </Progress.Section>
            </Progress.Root>
          )}
        </Modal>
      </div>

      {alertSubmit && (
        <div className="my-4">
          <Alert color="teal" title="Profil berhasil diperbarui" onClose={() => setAlertSubmit(false)}>
            Profil Anda berhasil diperbarui.
          </Alert>
        </div>
      )}

      <div className="mb-4">
        <TextInput label="Nama" placeholder="Masukkan nama" value={displayName} onChange={(event) => setDisplayName(event.currentTarget.value)} />
      </div>

      <Group mt="md">
        <Button onClick={handleUpdateProfile} disabled={uploading}>
          {uploading ? "Uploading..." : "Update Profil"}
        </Button>
      </Group>
      <Group mt="md">
        <Button color="red" onClick={openModal}>
          Hapus Akun
        </Button>
      </Group>

      <Modal opened={modalOpened} onClose={closeModal} title="Konfirmasi Penghapusan Akun" centered>
        <Text mb="10px">Hapus akun akan menghapus semua data yang telah Anda berikan, termasuk penilaian dosen yang telah Anda berikan.</Text>
        <Text>Ketik "DELETE" untuk menghapus akun Anda:</Text>
        <TextInput placeholder="DELETE" value={deleteConfirm} onChange={(event) => setDeleteConfirm(event.currentTarget.value)} mt="md" />
        <Group mt="md">
          <Button onClick={closeModal}>Batal</Button>
          <Button color="red" onClick={handleDeleteAccount}>
            Hapus Akun
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Dashboard;
