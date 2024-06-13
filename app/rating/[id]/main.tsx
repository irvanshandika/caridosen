// app/rating/[id]/main.tsx
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { db } from "@config/FirebaseConfig";
import { useRouter } from "next/navigation";
import { getDoc, doc, addDoc, collection, serverTimestamp, query, where, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { Rating, Textarea, Button, Card } from "@mantine/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ListKomentar from "@section/ListKomentar";
import { IconTrashFilled, IconPencil } from "@tabler/icons-react";

const RatingDosen = ({ id }: { id: string }) => {
  const auth = getAuth();
  const router = useRouter();
  const [dosenDetail, setDosenDetail] = useState<any>({});
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [dosenId, setDosenId] = useState(id);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [ratingDistribution, setRatingDistribution] = useState<number[]>([0, 0, 0, 0, 0]);
  const [userRatingId, setUserRatingId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setCreatedBy(user.uid);
        setUserName(user.displayName || "");
        setPhotoURL(user.photoURL || "");
      } else {
        router.push("/forbidden");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    const getDosen = async () => {
      const dosenRef = doc(db, "dosen", dosenId);
      const dosenSnap = await getDoc(dosenRef);
      if (dosenSnap.exists()) {
        setDosenDetail(dosenSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    if (user) {
      getDosen();
    }
  }, [dosenId, user]);

  useEffect(() => {
    const getAverageRating = async () => {
      if (!dosenId) return;

      const q = query(collection(db, "rating"), where("dosenId", "==", dosenId));
      const querySnapshot = await getDocs(q);
      const ratings = querySnapshot.docs.map((doc) => doc.data().rating);
      const totalRating = ratings.reduce((acc, curr) => acc + curr, 0);
      const avgRating = totalRating / ratings.length;

      const distribution = [0, 0, 0, 0, 0];
      ratings.forEach((rating: number) => {
        if (rating >= 1 && rating <= 5) {
          distribution[rating - 1]++;
        }
      });

      setAverageRating(avgRating);
      setRatingDistribution(distribution);
    };

    if (dosenId) {
      getAverageRating();
    }
  }, [dosenId]);

  useEffect(() => {
    const getUserRating = async () => {
      if (!user || !dosenId) return;

      const q = query(collection(db, "rating"), where("dosenId", "==", dosenId), where("createdBy", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userRatingDoc = querySnapshot.docs[0];
        setRating(userRatingDoc.data().rating);
        setKomentar(userRatingDoc.data().komentar);
        setUserRatingId(userRatingDoc.id);
      }
    };

    if (dosenId && user) {
      getUserRating();
    }
  }, [dosenId, user]);

  const handleSubmitRating = async (e: any) => {
    e.preventDefault();

    try {
      if (userRatingId) {
        const ratingRef = doc(db, "rating", userRatingId);
        await updateDoc(ratingRef, {
          rating: rating,
          komentar: komentar,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "rating"), {
          dosenId: dosenId,
          rating: rating,
          komentar: komentar,
          createdBy: user.uid,
          userName: userName,
          photoURL: photoURL,
          createdAt: serverTimestamp(),
        });
      }
      window.location.reload();
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  const handleDeleteRating = async () => {
    try {
      if (userRatingId) {
        const ratingRef = doc(db, "rating", userRatingId);
        await deleteDoc(ratingRef);
        setRating(0);
        setKomentar("");
        setUserRatingId(null);
        window.location.reload();
      }
    } catch (error) {
      console.log("Error deleting document: ", error);
    }
  };

  const getPercentage = (count: number, total: number) => {
    if (total === 0) return "0%";
    return `${((count / total) * 100).toFixed(2)}%`;
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center lg:my-24 my-16">
        <Card className="lg:px-16 lg:mx-40 mx-4 px-2">
          <div>
            <div>
              <img src={dosenDetail.urlFoto} alt={dosenDetail.nama} className="w-32 h-32 lg:w-48 lg:h-48 rounded-full mx-auto" fetchPriority="high" />
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center items-start">
              <div>
                <h1 className="font-semibold">Nama Dosen</h1>
                <p>{dosenDetail.nama}</p>
              </div>
              <div className="mt-2">
                <h1 className="font-semibold">NIP Dosen</h1>
                <p>{dosenDetail.nip}</p>
              </div>
              <div className="mt-2">
                <h1 className="font-semibold">Email Dosen</h1>
                <p>{dosenDetail.email}</p>
              </div>
              <div className="mt-2">
                <h1 className="font-semibold">Dosen Universitas</h1>
                <p>{dosenDetail.universitas}</p>
              </div>
              <div className="mt-2">
                <h1 className="font-semibold">Deskripsi Dosen</h1>
                <p>{dosenDetail.deskripsi}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col lg:flex-row lg:items-center w-full">
              <div className="flex flex-col items-center lg:items-start lg:w-1/4 text-center lg:text-left">
                {averageRating !== null ? (
                  <>
                    <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">{ratingDistribution.reduce((a, b) => a + b, 0)} reviews</div>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="flex-1 mt-2 lg:mt-0">
                <div className="flex flex-col w-full">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center my-1 w-full">
                      <span className="w-6 text-right">{star}</span>
                      <div className="flex-1 mx-2 h-3 bg-gray-200 rounded relative">
                        <div
                          className="h-3 bg-green-500 rounded"
                          style={{
                            width: getPercentage(
                              ratingDistribution[star - 1],
                              ratingDistribution.reduce((a, b) => a + b, 0)
                            ),
                          }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col justify-center items-center my-2">
              {userRatingId ? (
                <form onSubmit={handleSubmitRating}>
                  <div className="my-2">
                    <div className="flex justify-center items-center">
                      <Rating defaultValue={0} size="xl" value={rating} onChange={setRating} />
                    </div>
                    <h1>Komentar</h1>
                    <Textarea className="lg:w-[80vw] w-[80vw]" rows={8} value={komentar} onChange={(e) => setKomentar(e.target.value)} />
                  </div>
                  <div className="mt-5">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                      <span className="mr-1">
                        <IconPencil className="w-4 h-4" />
                      </span>
                      Update
                    </Button>
                    <Button type="button" className="ml-2" variant="filled" color="red" onClick={handleDeleteRating}>
                      <span className="mr-1">
                        <IconTrashFilled className="w-4 h-4" />
                      </span>
                      Delete
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmitRating}>
                  <div className="my-2">
                    <div className="flex justify-center items-center">
                      <Rating defaultValue={0} size="xl" value={rating} onChange={setRating} />
                    </div>
                    <h1>Komentar</h1>
                    <Textarea className="w-[80vw]" rows={8} value={komentar} onChange={(e) => setKomentar(e.target.value)} />
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                    Posting
                  </Button>
                </form>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <ListKomentar />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default RatingDosen;
