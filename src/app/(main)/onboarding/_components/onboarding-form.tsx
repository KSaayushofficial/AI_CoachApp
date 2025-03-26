"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { updateUser } from "../../../actions/user";
import { toast } from "sonner";
import { Router } from "lucide-react";

const schema = z.object({
  exampleField: z.string().min(1, "This field is required"),
});

interface OnboardingFormProps {
  industries: { id: string; name: string; subIndustries?: string[] }[];
}

const OnboardingForm = ({ industries }: OnboardingFormProps) => {
  const [selectedIndustry, setselectedIndustry] = useState<{
    id: string;
    name: string;
    subIndustries: string[];
  } | null>(null);
  const router = useRouter();
  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser) as {
    loading: boolean;
    fn: (data: any) => Promise<void>;
    data:
      | { success: boolean; updatedUser: any; industryInsight: any }
      | null
      | undefined;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit = async (values: z.infer<typeof onboardingSchema>) => {
    try {
      const formattedIndustry = `${values.industry}-${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (updateResult && updateResult.success && !updateLoading) {
    useEffect(() => {
      if (updateResult?.success && !updateLoading) {
        toast.success("Profile completed successfully!");
        router.push("/dashboard");
        router.refresh();
      }
    });
  }
  const watchIndustry = watch("industry");
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry tp get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                value={watchIndustry || ""}
                onValueChange={(value) => {
                  setValue("industry", value);
                  const selected = industries.find((ind) => ind.id === value);
                  setselectedIndustry(
                    selected
                      ? {
                          ...selected,
                          subIndustries: selected.subIndustries || [],
                        }
                      : null
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry" className="w-[180px]">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => {
                    return (
                      <SelectItem value={ind.id} key={ind.id}>
                        {ind.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500">
                  {errors.industry.message}
                </p>
              )}
            </div>
            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialization</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                >
                  <SelectTrigger id="subIndustry" className="w-[180px]">
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((ind: string) => {
                      return (
                        <SelectItem value={ind} key={ind}>
                          {ind}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-500">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of experience"
                {...register("experience")}
              />

              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="Ex. Python,JavaScript,Project Management"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Seperate multiple skills with commas
              </p>

              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background..."
                className="h-32"
                {...register("bio")}
              />
              <p
                className="text-sm text-muted-foregroun
              
              
              d"
              >
                Seperate multiple skills with commas
              </p>

              {errors.bio && (
                <p className="text-sm text-red-500">{errors.bio.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Complete Your Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
