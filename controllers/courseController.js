const CourseModel = require("../model/CourseModel");

module.exports.postCourse__controller = async (req, res, next) => {
  try {
    const { courseDescription, courseName } = req.body;
    

    if(!courseDescription || !courseName || !req.file){
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }

    const url = req.protocol + "://" + req.get("host");

    const course = new CourseModel({
      courseDescription,
      courseName,
      courseThumbnail: url + "/uploads/" + req.file.filename,
      createdAt: req.user._id,
    });
    course
      .save()
      .then((result) => {
        return res.status(200).json({
          result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          error: "Something went wrong",
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.getCourses__controller = async (req, res, next) => {
  try {
        const courses=await CourseModel.find().populate("createdAt","role _id userName email")
        return res.status(200).json({
            courses
          });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
}

module.exports.getOneCourse__controller = async (req, res, next) => {
  try {
      const {courseId}=req.params
      console.log(courseId)
        const course=await CourseModel.findOne({_id: courseId})
        return res.status(200).json({
            course
          });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
}
