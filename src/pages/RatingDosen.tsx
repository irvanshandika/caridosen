/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { db } from "@config/FirebaseConfig";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getDoc, doc, addDoc, collection, serverTimestamp, query, where, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { Rating } from "@mantine/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ListKomentar from "@src/sections/ListKomentar";

const RatingDosen = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [dosenDetail, setDosenDetail] = useState<any>({});
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [dosenId, setDosenId] = useState("");
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [ratingDistribution, setRatingDistribution] = useState<number[]>([0, 0, 0, 0, 0]);
  const [userRatingId, setUserRatingId] = useState<string | null>(null);

  const params = useParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/forbidden");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const getDosen = async () => {
      setDosenId(params.id ?? "");
      setCreatedBy(user?.displayName || "");
      const dosenRef = doc(db, "dosen", params.id ?? "");
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
  }, [params, user]);

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

      const q = query(collection(db, "rating"), where("dosenId", "==", dosenId), where("createdBy", "==", user.displayName));
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
          createdBy: user.displayName,
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
      <Helmet>
        <title>Rating Dosen | CariDosen</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center lg:my-24 my-16">
        <Card className="lg:px-16 lg:mx-40 mx-4 px-2">
          <CardHeader>
            <CardTitle>
              <img src={dosenDetail.urlFoto} alt={dosenDetail.nama} className="w-32 h-32 lg:w-48 lg:h-48 rounded-full mx-auto" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-center items-start">
              <CardDescription>
                <h1 className="font-semibold">Nama Dosen</h1>
                <p>{dosenDetail.nama}</p>
              </CardDescription>
              <CardDescription className="mt-2">
                <h1 className="font-semibold">NIP Dosen</h1>
                <p>{dosenDetail.nip}</p>
              </CardDescription>
              <CardDescription className="mt-2">
                <h1 className="font-semibold">Email Dosen</h1>
                <p>{dosenDetail.email}</p>
              </CardDescription>
              <CardDescription className="mt-2">
                <h1 className="font-semibold">Dosen Universitas</h1>
                <p>{dosenDetail.universitas}</p>
              </CardDescription>
              <CardDescription className="mt-2">
                <h1 className="font-semibold">Deskripsi Dosen</h1>
                <p>{dosenDetail.deskripsi}</p>
              </CardDescription>
            </div>
          </CardContent>
          <CardContent>
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
          </CardContent>
          <CardFooter>
            <div className="flex flex-col justify-center items-center my-2">
              {userRatingId ? (
                <form onSubmit={handleSubmitRating}>
                  <div className="my-2">
                    <div className="flex justify-center items-center">
                      <Rating defaultValue={0} size="xl" value={rating} onChange={setRating} />
                    </div>
                    <h1>Komentar</h1>
                    <Textarea className="lg:w-[50vw] w-[80vw]" rows={8} value={komentar} onChange={(e) => setKomentar(e.target.value)} />
                  </div>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                    Update
                  </Button>
                  <Button type="button" className="bg-red-600 hover:bg-red-500 ml-2" onClick={handleDeleteRating}>
                    Delete
                  </Button>
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
          </CardFooter>
          <CardFooter>
            <div className="flex flex-col gap-2 justify-center items-center">
              <ListKomentar />
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default RatingDosen;
