import { useQueryClient, useMutation } from "@tanstack/react-query";
import { doc, setDoc } from 'firebase/firestore'
import { db } from 'firebase'

export async function setFirestore({ document, fieldId, data }) {
    await setDoc(doc(db, document, fieldId), {
      ...data
    });
  }

export function useSetQuery({ document, condition }) {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ fieldId, data }) => {
        setFirestore({ document, fieldId, data });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: condition ? [document, condition] : [document] });
      },
      onError: (error) => {
        console.log(error);
        // swal('데이터 로딩에 실패하였습니다.', '👎');
      }
    });
  }