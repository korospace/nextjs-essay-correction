// react
import { useEffect, useState } from "react";
// external lib
import toast from "react-hot-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
// components
import { DatePicker, Divider } from "@nextui-org/react";
import SelectOptionComponent from "../SelectOptionComponent";
// types
import { ExamType } from "@/lib/types/ResultTypes";
import { InvalidFieldType, SelectOptionType } from "@/lib/types/ComponentTypes";
// services
import {
  GetExamCourseOpt,
  HttpSaveExam,
} from "@/lib/services/functions/frontend/examFunc";
import { ExamInputType } from "@/lib/types/InputTypes";

/**
 * Props
 * -----------------------------------
 */
type Props = {
  dtGeneralInfo?: ExamType;
};

export default function ExamGeneralInfoForm({ dtGeneralInfo }: Props) {
  // -- Use State --
  const [courseOpt, setCourseOpt] = useState<SelectOptionType[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [idCourse, setIdCourse] = useState<string>("");
  const [idCourseInvalid, setIdCourseInvalid] = useState<InvalidFieldType>();
  const [titleInvalid, setTitleInvalid] = useState<InvalidFieldType>();
  const [descriptionInvalid, setDescriptionInvalid] =
    useState<InvalidFieldType>();
  const [startDateInvalid, setStartDateInvalid] = useState<InvalidFieldType>();
  const [endDateInvalid, setEndDateInvalid] = useState<InvalidFieldType>();
  const [durationInvalid, setDurationInvalid] = useState<InvalidFieldType>();

  // -- Use effect --
  useEffect(() => {
    handleFetchCourseOption();
  }, []);

  // -- Functions --
  const handleFetchCourseOption = async () => {
    const res = await GetExamCourseOpt();

    if (res.status == false) {
      toast.error(res.message);
    } else {
      setCourseOpt(res.data);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // reset error
    setIdCourseInvalid({ invalid: false, message: "" });
    setTitleInvalid({ invalid: false, message: "" });
    setDescriptionInvalid({ invalid: false, message: "" });
    setStartDateInvalid({ invalid: false, message: "" });
    setEndDateInvalid({ invalid: false, message: "" });
    setDurationInvalid({ invalid: false, message: "" });

    // value
    const id_course = idCourse != "" ? parseInt(idCourse) : 0;
    const title = e.target.title.value;
    const description = e.target.description.value;
    const start_date = e.target.start_date.value;
    const start_time = e.target.start_time.value;
    const end_date = e.target.end_date.value;
    const end_time = e.target.end_time.value;
    const duration =
      e.target.duration.value !== "" ? parseInt(e.target.duration.value) : 0;

    // validation empty
    let valid = true;
    if (id_course == 0) {
      valid = false;
      setIdCourseInvalid({ invalid: true, message: "course cant be empty" });
    }
    if (title == "") {
      valid = false;
      setTitleInvalid({ invalid: true, message: "title cant be empty" });
    }
    if (description == "") {
      valid = false;
      setDescriptionInvalid({
        invalid: true,
        message: "description cant be empty",
      });
    }
    if (start_date == "" || start_time == "") {
      valid = false;
      setStartDateInvalid({
        invalid: true,
        message: "start date cant be empty",
      });
    }
    if (end_date == "" || end_time == "") {
      valid = false;
      setEndDateInvalid({ invalid: true, message: "end date cant be empty" });
    }
    if (duration == 0) {
      valid = false;
      setDurationInvalid({ invalid: true, message: "duration cant be empty" });
    }
    if (!valid) return;

    // build payload
    const httpMethod: string = dtGeneralInfo === undefined ? "POST" : "PUT";
    const httpPayload: ExamInputType = {
      id_course: id_course,
      title: title,
      description: description,
      start_date: start_date + " " + start_time,
      end_date: end_date + " " + end_time,
      duration: duration,
    };

    // HTTP
    setLoadingSubmit(true);
    const res = await HttpSaveExam("api/exam", httpMethod, httpPayload);
    setLoadingSubmit(false);

    // response
    if (res.status == true) {
      toast.success("exam saved successfully!");

      console.log(res);
    } else {
      if (res.message === "validation failed") {
        if (res.data.id_course) {
          setIdCourseInvalid({
            invalid: true,
            message: res.data.id_course,
          });
        }
        if (res.data.title) {
          setTitleInvalid({
            invalid: true,
            message: res.data.title,
          });
        }
        if (res.data.description) {
          setDescriptionInvalid({
            invalid: true,
            message: res.data.description,
          });
        }
        if (res.data.start_date) {
          setStartDateInvalid({
            invalid: true,
            message: res.data.start_date,
          });
        }
        if (res.data.end_date) {
          setEndDateInvalid({
            invalid: true,
            message: res.data.end_date,
          });
        }
        if (res.data.duration) {
          setDurationInvalid({
            invalid: true,
            message: res.data.duration,
          });
        }
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="p-3 bg-budiluhur-500 rounded-md shadow">
      <h1 className="text-3xl font-extrabold text-budiluhur-700">
        General Information
      </h1>

      <div className="my-4">
        <Divider className="bg-budiluhur-700 opacity-50" />
      </div>

      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Course */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-budiluhur-700/80">
            Course
          </label>
          <SelectOptionComponent
            invalid={idCourseInvalid}
            dtOption={courseOpt}
            onChange={(opt) => {
              setIdCourse(opt?.key || "");
              setIdCourseInvalid({ invalid: false, message: "" });
            }}
          />
        </div>

        {/* Title */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-budiluhur-700/80">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Input exam title"
            className={`w-full max-w-lg p-2.5 block placeholder-budiluhur-700/50 text-md outline-none rounded-md border ${
              titleInvalid?.invalid
                ? "bg-red-300 border-red-600 text-red-700"
                : "bg-budiluhur-300 border-budiluhur-600 text-budiluhur-700"
            }`}
            onChange={() => setTitleInvalid({ invalid: false, message: "" })}
          />
          {titleInvalid?.invalid && (
            <p className="mt-2 text-sm text-red-600">{titleInvalid.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-budiluhur-700/80">
            Description
          </label>
          <textarea
            rows={4}
            name="description"
            placeholder="Input exam description"
            className={`w-full max-w-lg p-2.5 block placeholder-budiluhur-700/50 text-md outline-none rounded-md border ${
              descriptionInvalid?.invalid
                ? "bg-red-300 border-red-600 text-red-700"
                : "bg-budiluhur-300 border-budiluhur-600 text-budiluhur-700"
            }`}
            onChange={() =>
              setDescriptionInvalid({ invalid: false, message: "" })
            }
          ></textarea>
          {descriptionInvalid?.invalid && (
            <p className="mt-2 text-sm text-red-600">
              {descriptionInvalid.message}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-budiluhur-700/80">
            Start Date
          </label>
          <div className="w-full max-w-lg flex gap-2">
            <div className="w-3/5">
              <input
                type="date"
                name="start_date"
                className={`w-full p-2.5 placeholder-budiluhur-700/50 text-md outline-none rounded-md border ${
                  startDateInvalid?.invalid
                    ? "bg-red-300 border-red-600 text-red-700"
                    : "bg-budiluhur-300 border-budiluhur-600 text-budiluhur-700"
                }`}
                onChange={() =>
                  setStartDateInvalid({ invalid: false, message: "" })
                }
              />
              {startDateInvalid?.invalid && (
                <p className="mt-2 text-sm text-red-600">
                  {startDateInvalid.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="time"
                name="start_time"
                className={`w-full p-2.5 placeholder-budiluhur-700/50 text-md outline-none rounded-md border ${
                  startDateInvalid?.invalid
                    ? "bg-red-300 border-red-600 text-red-700"
                    : "bg-budiluhur-300 border-budiluhur-600 text-budiluhur-700"
                }`}
                onChange={() =>
                  setStartDateInvalid({ invalid: false, message: "" })
                }
              />
            </div>
          </div>
        </div>

        {/* End Date */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-budiluhur-700/80">
            End Date
          </label>
          <div className="w-full max-w-lg flex gap-2">
            <div className="w-3/5">
              <input
                type="date"
                name="end_date"
                className={`w-full p-2.5 placeholder-budiluhur-700/50 text-md outline-none rounded-md border ${
                  endDateInvalid?.invalid
                    ? "bg-red-300 border-red-600 text-red-700"
                    : "bg-budiluhur-300 border-budiluhur-600 text-budiluhur-700"
                }`}
                onChange={() =>
                  setEndDateInvalid({ invalid: false, message: "" })
                }
              />
              {endDateInvalid?.invalid && (
                <p className="mt-2 text-sm text-red-600">
                  {endDateInvalid.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <input
                type="time"
                name="end_time"
                className={`w-full p-2.5 placeholder-budiluhur-700/50 text-md outline-none rounded-md border ${
                  endDateInvalid?.invalid
                    ? "bg-red-300 border-red-600 text-red-700"
                    : "bg-budiluhur-300 border-budiluhur-600 text-budiluhur-700"
                }`}
                onChange={() =>
                  setEndDateInvalid({ invalid: false, message: "" })
                }
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-budiluhur-700/80">
            Duration{" "}
            <small>
              <i>(in minute)</i>
            </small>
          </label>
          <input
            type="number"
            name="duration"
            placeholder="Input exam duration"
            className={`w-full max-w-lg p-2.5 block placeholder-budiluhur-700/50 text-md outline-none rounded-md border ${
              durationInvalid?.invalid
                ? "bg-red-300 border-red-600 text-red-700"
                : "bg-budiluhur-300 border-budiluhur-600 text-budiluhur-700"
            }`}
            onChange={() => setDurationInvalid({ invalid: false, message: "" })}
          />
          {durationInvalid?.invalid && (
            <p className="mt-2 text-sm text-red-600">
              {durationInvalid.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="flex items-center py-2.5 px-5 mt-10 text-sm font-medium text-budiluhur-400 focus:outline-none bg-budiluhur-700 rounded-md hover:bg-budiluhur-600 hover:text-budiluhur-300 focus:bg-budiluhur-600 focus:text-budiluhur-300"
        >
          <Icon
            icon="eos-icons:loading"
            className={`mr-2 ${loadingSubmit ? "" : "hidden"}`}
          />
          Save
        </button>
      </form>
    </div>
  );
}
