"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link  from "next/link";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
});
const CreateCourse = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const router=useRouter()
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const res = await axios.post('/api/courses',values);
        console.log(res)
         router.push(`/teacher/courses/${res.data.id}`)
        toast.success("Course Created Successfully")
    } catch (error) {
        toast.error("Something Went Wrong")
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl"> Name Your Course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, You can
          change it later
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 'Cyber Security'" {...field} />
                  </FormControl>
                  <FormDescription>
                    What do you want to teach in this course
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
                <Link href="/">
                  <Button type="button" variant='ghost'>
                     Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSubmitting||!isValid} >
                    Continue
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourse;
