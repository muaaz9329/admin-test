'use client';
import React from 'react'
import DailyStudiesForm, { DailyStudiesFormState } from '../components/daily-studies-form'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { fireStorage, firestore } from "@/lib/firebase/firebase-config";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'
import toast from 'react-hot-toast';

type Props = {}

function page({}: Props) {
    const [isUploading, setIsUploading] = React.useState(false);


   const onStudySubmission = async (values: DailyStudiesFormState) => {
    const loadingToastId = toast.loading("Adding Studies...");
    setIsUploading(true);
     /*
    We'll first add a document to daily-studies collection and keep image and pdfFile fields empty.
    Then we'll update image and pdfFile to cloud storage folder news with the document id as name like docid-image, docid-pdf
    Then we'll update the document with the image and pdf urls.

    If an error occurs during news addition, we'll delete the document from news collection and delete the image and video from storage.
    */

    const folderRef = ref(fireStorage, "daily-studies");

    const dailyStudiesCollection = collection(firestore, "daily-studies");

    try{
        // adding new Doc

        const StudyDoc = await addDoc(dailyStudiesCollection , {
            name: values.fileName,
            coverImage:'',
            pdfLink:'',
            studyContent:values.studyContent,
            timeToRead:values.timeToRead,
        })

        const imageRef = ref(folderRef, `${StudyDoc.id}-image`);
        // const pdfRef = ref(folderRef, `${newDoc.id}-pdf`); TODO: add pdf upload

        try{
            await uploadBytes(imageRef, values.coverImage)
            console.log('image uploaded')
            const downloadUrl = await getDownloadURL(imageRef)
            await updateDoc(StudyDoc,{
                coverImage:downloadUrl
            });
        }
        catch(error){
            console.log(error)
            setIsUploading(false);
        toast.dismiss(loadingToastId);
        toast.error("An error occurred while adding daily Studies. Please try again later.");
        // delete the document from news collection
        deleteDoc(StudyDoc);
        return;

        }

        setIsUploading(false);

      toast.dismiss(loadingToastId);
      toast.success("News added successfully");

      // redirect to news page
      router.back();
    }
    catch(error){
        setIsUploading(false);

      console.log({ error });
      toast.dismiss(loadingToastId);
      toast.error("Error adding news");
    }

   }
    const router = useRouter()
  return (
    <DailyStudiesForm
    onSubmit={onStudySubmission}
    footer={
        <div className="mt-4 flex justify-between">
              <Button
                size={"lg"}
                variant="outline"
                type="reset"
                className='mx-4'
                disabled={isUploading}
                onClick={() => {
                  router.back();
                }}
              >
               
                <X className="w-5 h-5 ml-1" />
                Cancel
                {}
              </Button>

              <Button size={"lg"} type="submit"  disabled={isUploading} >
                <Check className="w-5 h-5 ml-1" />
                Upload
                {}
              </Button>
            </div>
    }
    
    />
  )
}

export default page