import { toast } from "sonner";
import { useState } from "react";

export const useFetch = (cb: (...args: any[]) => Promise<any>) => {
      const [data, setData] = useState(undefined);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const fn = async (...args: any[]) => {
setLoading(true);
setError(null);
try {
      const response = await cb(...args);
      setData(response);
      setError(null);
} catch (error: any) {
      setError(error);
      toast.error(error.message);
}
      finally{
            setLoading(false);
      }
};
      return {data,loading,error,fn,setData}
};