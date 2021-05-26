<template>
  <div>
    <div style="margin-top:50px;">
      <el-input v-model="courseName" placeholder="请输入课程名" style="width:80%" clearable></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="searchCourseByName">搜索</el-button>
      <el-button type="primary" style="margin-left:10px;margin-bottom: 20px;" @click="showDialog">新增课程</el-button>
    </div>
    <div>
      <el-table
          @selection-change="handleSelectionChange"
          :data="courses"
          border>
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="id"
            label="课程名"
            width="180">
        </el-table-column>

        <el-table-column
            prop="teacher"
            label="任课教师"
            width="180">
        </el-table-column>
        <el-table-column
            prop="term"
            label="开课学期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="accomadation"
            label="开课学院"
            width="180">
        </el-table-column>
        <el-table-column
            prop="num"
            label="课程容量"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作">
          align="left">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="mini" style="margin-top: 12px" :disabled="multipleSelection.length === 0" @click="deleteCourses">批量删除</el-button>
    </div>
    <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogFormVisible" center>
      <el-form :model="form" :rules="rules" ref="course">
        <el-form-item label="课程编号" :label-width="formLabelWidth" prop="id">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师" :label-width="formLabelWidth" prop="teacher">
          <el-input v-model="form.teacher" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学期" :label-width="formLabelWidth" prop="term">
          <el-input v-model.number="form.term" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="开课学院" :label-width="formLabelWidth" prop="accomadation">
          <el-input v-model="form.accomadation" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程容量" :label-width="formLabelWidth" prop="num">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCourse">确 定</el-button>
      </div>
    </el-dialog>
    <el-upload
        style="margin-top:20px;"
        action="/upload"
        multiple
        :on-success="handleSuccess"
        :limit="3"
        :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Course',
  components: {
  },
  data: function () {
    return {
      fileList: [],
      courseName: '',
      multipleSelection: [],
      dialogTitle: {
        addCourse: "新增课程",
        editCourse: "编辑课程"
      },
      dialogStatus: "",
      rules: {
        id: [
          {required: true, message: '请输入', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入课程名', trigger: 'blur'}
        ],
        teacher: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        term: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        accomadation: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
        num: [
          {required: true, message: '请输入', trigger: 'change'}
        ],
      },
        msg: '',
        courses: [],
        search: '',
        dialogFormVisible: false,
        form: {
          id: '',
          name: '',
          teacher: '',
          term: '',
          accomadation: '',
          num: '',
        },
        formLabelWidth: '120px',
      }
    },
        created()
    {
      this.findAllCourses();
    },
    watch:{
      courseName()
      {
        this.findAllCourses();
      }
    },
    methods: {
      // deleteFile (file) {
      //   console.log(file)
      // },
      handleSuccess(file)
      {
        const filename = file.name;
        this.$message({
          message: '文件上传成功！',
          type: 'success'
        });
      },
      searchCourseByName()
      {
        if (this.courseName !== '') {
          this.$axios.get("/course/findCourseByName?name=" + this.courseName).then((resp) => {
            this.courses = resp.data;
          }).catch((error) => {
            this.$message({
              type: 'error',
              message: "查询失败，原因是" + error.data.message
            });
          })
        }
      }
    ,
      deleteCourses()
      {
        this.$confirm('此操作将永久删除课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = '?';
          this.multipleSelection.forEach((item) => {
            ids += 'ids=' + item.uid + '&'
          });
          this.$axios.post("/course/deleteCoursesByIds" + ids).then((resp) => {
            if (resp) {
              this.findAllCourses();
              this.$message.success("删除成功！");
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    ,
      handleSelectionChange(val)
      {
        this.multipleSelection = val;
        console.log(val)
      }
    ,
      submitCourse()
      {
        if (this.dialogStatus === 'addCourse') {
          this.addCourse();
        } else if (this.dialogStatus === "editCourse") {
          this.editCourse();
        }
      }
    ,
      findAllCourses()
      {
        this.$axios.get("/course/findAllCourses")
            .then((res) => {
              this.courses = res.data
            })
            .catch(error => {
              this.$message({
                type: 'error',
                message: "查询失败，原因是" + error.data.message
              });
            });
      },
      handleEdit(row)
      {
        this.dialogFormVisible = true;
        this.dialogStatus = "editCourse";
        this.form.uid = row.uid;
        this.form.id = row.id;
        this.form.name = row.name;
        this.form.teacher = row.teacher;
        this.form.term = row.term;
        this.form.accomadation = row.accomadation;
        this.form.num = row.num;
      },
      handleDelete(row)
      {
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("/course/deleteCourse?uid=" + row.uid).then((resp) => {
            this.$message.success("删除成功!")
            this.findAllCourses();
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    ,
      showDialog()
      {
        this.form.uid = '';
        this.form.id = '';
        this.form.name = '';
        this.form.teacher = '';
        this.form.term = '';
        this.form.accomadation = '';
        this.form.num = '';

        this.dialogFormVisible = true;
        this.dialogStatus = "addCourse";
      },
      addCourse()
      {
        this.$refs.course.validate((valid) => {
          if (valid) {
            this.$axios.post("/course/addCourse", this.form).then((resp) => {
              if (resp) {
                this.dialogFormVisible = false;
                this.$message.success("添加成功！");
                this.findAllCourses();
              }
            }).catch((error) => {
              this.$message({
                message: '添加数据失败，原因是' + error.data.message,
                type: 'error'
              })
            })
          } else {
            this.$message({
              message: '请输入所有字段',
              type: 'error'
            })
            return false;
          }
        });
      },
      editCourse()
      {
        this.$axios.post("/course/updateCourse", this.form).then((resp) => {
          this.dialogFormVisible = false;
          this.$message.success("修改成功!");
          this.findAllCourses();
        }).catch((error) => {
          this.$message({
            message: '数据更新失败，原因是' + error.data.message,
            type: 'error'
          })
        })
      }
    }
  }
</script>
<style scoped>
.table {
  margin: 0 auto;
  clear: both;
}
</style>
