<template>
  <div>
    <div style="margin-top:50px;">
      <el-input v-model="teacherName" placeholder="请输入教师姓名" style="width:80%" clearable></el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="searchTeacherByName">搜索</el-button>
      <el-button type="primary" style="margin-left:10px;margin-bottom: 20px;" @click="showDialog">新增教师</el-button>
    </div>

    <div>
      <el-table
          @selection-change="handleSelectionChange"
          :data="teachers"
          stripe
          max-height="480"
          :default-sort = "{prop: 'uid', order: 'descending'}"
          border>
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="uid"
            label="教职工号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="180">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            width="80">
        </el-table-column>
        <el-table-column
            prop="homeland"
            label="国籍"
            width="180">
        </el-table-column>
        <el-table-column
            prop="nation"
            label="民族"
            width="100">
        </el-table-column>
        <el-table-column
            label="更多"
            width="100"
            type="expand">
          <template #default="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="任职年级:">
                <span>{{ props.row.grade}}</span>
              </el-form-item>
              <el-form-item label="任职科目:">
                <span>{{ props.row.subject }}</span>
              </el-form-item>
              <el-form-item label="工作经验:">
                <span>{{ props.row.exp }}</span>
              </el-form-item>
              <el-form-item label="家庭住址:">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="工作电话:">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="工作邮箱:">
                <span>{{ props.row.mail }}</span>
              </el-form-item>
              <el-form-item label="工作QQ:">
                <span>{{ props.row.qq}}</span>
              </el-form-item>
              <el-form-item label="工作微信:">
                <span>{{ props.row.wechat }}</span>
              </el-form-item>
              <el-form-item label="办公室 :">
                <span>{{ props.row.office }}</span>
              </el-form-item>
              <el-form-item label="上班状态:">
                <span>{{ props.row.conditions}}</span>
              </el-form-item>
              <el-form-item label="个人荣誉:">
                <span>{{ props.row.hononr}}</span>
              </el-form-item>
              <el-form-item label="入职时间:">
                <span>{{ props.row.worktime}}</span>
              </el-form-item>
              <el-form-item label="政治面貌:">
                <span>{{ props.row.party}}</span>
              </el-form-item>
              <el-form-item label="毕业院校:">
                <span>{{ props.row.school}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            label=" 操作"
            width="150">
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
      <el-button type="danger" size="mini" style="margin-top: 12px" :disabled="multipleSelection.length === 0" @click="deleteTeachers">批量删除</el-button>
    </div>

    <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogFormVisible" center>
      <el-form :model="form"  status-icon :rules="rules" ref="teacher">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" show-word-limit
                    maxlength='19' minlength='2'></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-slider
              v-model.number="form.age"
              show-input>
          </el-slider>
        </el-form-item>
        <el-form-item label="国籍" :label-width="formLabelWidth" prop="homeland">
          <el-input v-model="form.homeland" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="民族" :label-width="formLabelWidth" prop="nation">
          <el-input v-model="form.nation" autocomplete="off" show-word-limit
                    maxlength='8' minlength='1'></el-input>
        </el-form-item>
        <el-form-item label="任课年级" :label-width="formLabelWidth" prop="grade">
          <el-select v-model="form.grade" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in options_grade"
                :key="item.value"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任课学科" :label-width="formLabelWidth" prop="subject">
          <el-select v-model="form.subject" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in options_sub"
                :key="item.value"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作宣言" :label-width="formLabelWidth" prop="exp">
          <el-input v-model="form.exp"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
          <el-cascader :options="options_address" v-model="form.addresses" show-all-levels="true" separator=","
                       @change="prepareSave()"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="工作电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作邮箱" :label-width="formLabelWidth" prop="mail">
          <el-input v-model="form.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作qq" :label-width="formLabelWidth" prop="qq">
          <el-input v-model="form.qq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作微信" :label-width="formLabelWidth" prop="wechat">
          <el-input v-model="form.wechat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="办公室" :label-width="formLabelWidth" prop="office">
          <el-input v-model="form.office" autocomplete="off" show-word-limit
                    maxlength='19' minlength='2'></el-input>
        </el-form-item>
        <el-form-item label="工作状态" :label-width="formLabelWidth" prop="conditions">
          <el-select v-model="form.conditions" placeholder="请选择" style="width: 100%">
            <el-option
                v-for="item in options_con"
                :key="item.value"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="曾获荣誉" :label-width="formLabelWidth" prop="hononrss">
          <!--          <el-form-item>{{form.hononrss}}</el-form-item>-->
          <el-checkbox-group v-model="form.hononrss">
            <el-checkbox label="优秀教师"></el-checkbox>
            <el-checkbox label="荣誉教师"></el-checkbox>
            <el-checkbox label="其他"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="入职时间":label-width="formLabelWidth" prop="worktime">
          <el-date-picker
              v-model="form.worktime"
              type="date"
              style="width: 100%;"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change="getBirthDate"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <!--        <el-form-item label="政治面貌" :label-width="formLabelWidth" prop="party">-->
        <!--          <el-input v-model="form.party" autocomplete="off" show-word-limit-->
        <!--                    maxlength='10' minlength='2'></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="政治面貌" :label-width="formLabelWidth" prop="party">
          <el-radio-group v-model="form.party">
            <el-radio-button label="预备团员"></el-radio-button>
            <el-radio-button label="共青团员"></el-radio-button>
            <el-radio-button label="入党积极分子"></el-radio-button>
            <el-radio-button label="预备党员"></el-radio-button>
            <el-radio-button label="中共党员"></el-radio-button>
            <el-radio-button label="群众"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="毕业院校" :label-width="formLabelWidth" prop="school">
          <el-input v-model="form.school" autocomplete="off" show-word-limit
                    maxlength='19' minlength='2'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTeacher">确 定</el-button>
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

<style>
.demo-table-expand {
  font-size: 30px;
}
.demo-table-expand label {
  width: 90px;
  color: #a52a2a;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
  color: #409eff;
}
</style>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      // disabledDate(time) {
      //   return time.getTime() > Date.now()
      // },
      shortcuts: [{
        text: 'Today',
        value: new Date(),
      }, {
        text: 'Yesterday',
        value: (() => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          return date
        })(),
      }, {
        text: 'A week ago',
        value: (() => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          return date
        })(),
      }],

      value_worktime:'',
      value_age:'',
      fileList: [],
      teacherName: '',
      multipleSelection:[],
      dialogTitle: {
        addTeacher: "新增教师",
        editTeacher: "编辑教师"
      },
      dialogStatus: "",
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请您选择性别', trigger: 'change' }
        ],
        age: [
          { required: true, message: '年龄不能为空'},
          { type: 'number', message: '年龄必须大于24'}
        ],
        homeland: [
          { required: true, message: '请输入国籍', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '请输入民族', trigger: 'blur' }
        ],
        grade: [
          { required: true, message: '请填入年级', trigger: 'change' }
        ],
        subject: [
          { required: true, message: '请您选择性', trigger: 'change' }
        ],
        exp: [
          { required: true, message: '请输入工作宣言', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择地址', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入工作电话', trigger: 'blur' },
          {
            validator: function(rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("手机号格式错误"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        mail: [
          { required: true, message: '请输入工作邮箱', trigger: 'blur' },
          {type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"}

        ],
        qq: [
          { required: true, message: '请输入工作qq', trigger: 'blur' }
        ],
        wechat: [
          { required: true, message: '请输入工作微信', trigger: 'blur' }
        ],
        office: [
          { required: true, message: '请输入工作地点', trigger: 'blur' }
        ],
        conditions: [
          { required: true, message: '请填入工作状态', trigger: 'change' }
        ],
        hononr: [
          { required: true, message: '请选入所获荣誉',trigger: 'blur' }
        ],
        worktime: [
          { required: true, message: '请选入职时间',trigger: 'change' }
        ],
        party: [
          { required: true, message: '请输入政治面貌', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '请输入毕业院校', trigger: 'blur' }
        ],
      },
      options: [{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      }],

      options_grade: [{
        value: '1',
        label: '2017'
      }, {
        value: '2',
        label: '2018'
      }, {
        value: '3',
        label: '2019'
      }, {
        value: '4',
        label: '2020'
      }],

      options_con: [{
        value: '1',
        label: '上班中'
      }, {
        value: '2',
        label: '休息中'
      }, {
        value: '3',
        label: '出差中'
      }, {
        value: '4',
        label: '事假/病假中'
      }],

      options_sub: [{
        value: '1',
        label: '数据结构'
      }, {
        value: '2',
        label: 'c++面向对象编程'
      }, {
        value: '3',
        label: 'Qt5开发实践'
      }, {
        value: '4',
        label: 'java设计模式'
      }, {
        value: '5',
        label: 'python程序开发实践'
      }],

      options_address: [{
        value: '重庆市',
        label: '重庆市',
        children: [{
          value: '沙坪坝区',
          label: '沙坪坝区',
          children: [{
            value: '大学城',
            label: '大学城'
          }, {
            value: '尖顶坡',
            label: '尖顶坡'
          }, {
            value: '陈家桥',
            label: '陈家桥'
          }, {
            value: '微电园',
            label: '微电园'
          }]
        },],
      }],


      msg: '',
      teachers:[],
      search: '',
      dialogFormVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        homeland:'',
        nation:'',
        grade: '',
        subject: '',
        exp: '',
        address:'',
        addresses:[],
        phone: '',
        mail: '',
        qq: '',
        wechat: '',
        office: '',
        conditions: '',
        hononr:'',
        hononrss:[],
        worktime: '',
        party: '',
        school: '',

      },
      formLabelWidth: '120px',
    }
  },
  created() {
    this.findAllTeachers();
  },
  watch:{
    teacherName () {
      this.findAllTeachers();
    }
  },
  methods: {
    getBirthDate (date) {
      this.form.worktime = date
    },
    prepareSave(value){
      this.form.address=this.form.addresses.join("-")
    },
    // deleteFile (file) {
    //   console.log(file)
    // },
    handleSuccess (file) {
      const filename = file.name;
      this.$message({
        message: '文件上传成功！',
        type: 'success'
      });
    },
    searchTeacherByName () {
      if (this.teacherName !== '') {
        this.$axios.get("/teacher/findTeacherByName?name="+this.teacherName).then( (resp)=> {
          this.teachers = resp.data;
        }).catch( (error)=>{
          this.$message({
            type: 'error',
            message: "查询失败，原因是"+error.data.message
          });
        })
      }
    },
    deleteTeachers () {
      this.$confirm('此操作将永久删除教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach( (item)=>{
          ids += 'ids='+item.uid+'&'
        });
        this.$axios.post("/teacher/deleteTeachersByIds"+ids).then( (resp)=> {
          if (resp) {
            this.findAllTeachers();
            this.$message.success("删除成功！");
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    submitTeacher () {
      if (this.dialogStatus === 'addTeacher'){
        this.addTeacher();
      } else if(this.dialogStatus === "editTeacher") {
        this.editTeacher();
      }
    },
    findAllTeachers () {
      this.$axios.get("/teacher/findAllTeachers")
          .then((res) => {
            this.teachers = res.data

            this.teachers.forEach((teacher)=>{
              if (teacher.address)
              {
                teacher.addresses = teacher.address.split("-");
              }
              else
              {
                teacher.addresses=[];
              }
            })

          })

          .catch(error => {
            this.$message({
              type: 'error',
              message: "查询失败，原因是"+error.data.message
            });
          });
    },
    handleEdit (row) {
      this.dialogFormVisible = true;
      this.dialogStatus = "editTeacher";
      this.form.uid = row.uid;
      this.form.name = row.name;
      this.form.age = row.age;
      this.form.sex = row.sex;
      this.form.homeland = row.homeland;
      this.form.nation = row.nation;
      this.form.grade = row.grade;
      this.form.subject = row.subject;
      this.form.exp = row.exp;
      this.form.address = row.address;
      this.form.phone = row.phone;
      this.form.mail = row.mail;
      this.form.qq = row.qq;
      this.form.wechat = row.wechat;
      this.form.office = row.office;
      this.form.conditions = row.conditions;
      this.form.hononr = row.hononr;
      this.form.hononrss = row.hononr.split(",");
      this.form.worktime = row.worktime;
      this.form.party = row.party;
      this.form.school = row.school;
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该教师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post("/teacher/deleteTeacher?uid="+row.uid).then ((resp)=>{
          this.$message.success("删除成功!")
          this.findAllTeachers();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    showDialog () {
      this.form.uid = '';
      this.form.name = '';
      this.form.age = '';
      this.form.sex = '';
      this.form.homeland = '';
      this.form.nation = '';
      this.form.grade = '';
      this.form.subject = '';
      this.form.exp = '';
      this.form.addresses = '';
      this.form.phone = '';
      this.form.mail = '';
      this.form.qq = '';
      this.form.wechat = '';
      this.form.office = '';
      this.form.conditions = '';
      this.form.hononr='';
      this.form.worktime='';
      this.form.party = '';
      this.form.school = '';

      this.dialogFormVisible = true;
      this.dialogStatus = "addTeacher";
    },
    addTeacher () {
      this.$refs.teacher.validate((valid) => {
        if (valid) {
          this.prepareSave()
          this.form.hononr = this.form.hononrss.join("-");
          this.$axios.post("/teacher/addTeacher",this.form).then( (resp)=>{
            if (resp) {
              this.dialogFormVisible = false;
              this.$message.success("添加成功！");
              this.findAllTeachers();
            }
          }).catch((error)=>{
            this.$message({
              message: '添加数据失败，原因是'+error.data.message,
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
    editTeacher () {
      this.form.hononr = this.form.hononrss.join("-");
      this.$axios.post("/teacher/updateTeacher",this.form).then( (resp)=>{
        this.dialogFormVisible = false;
        this.$message.success("修改成功!");
        this.findAllTeachers();
      }).catch( (error)=> {
        this.$message({
          message: '数据更新失败，原因是'+error.data.message,
          type: 'error'
        })
      })
    }
  }
}
</script>
<!--<style scoped>-->
<!--  .table {-->
<!--    margin: 0 auto;-->
<!--    clear: both;-->
<!--  }-->
<!--</style>-->
