<template>
  <a-card :bordered="false">
    <!-- <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="规则编号">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker style="width: 100%" placeholder="请输入更新日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div> -->

    <div class="table-operator">
      <a-button type="primary" @click="addphone()" icon="plus">新建联系人</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="mytable"
      size="default"
      :columns="columns"
      :data="loadData"
      :showAlertInfo="true"
      @onSelect="onChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <a-modal
      title="操作"
      :width="800"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :autoFormCreate="(form)=>{this.form = form}">

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='规则编号'
          hasFeedback
          validateStatus='success'
        >
          <a-input placeholder='规则编号' v-model="mdl.no" id='no' />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='服务调用次数'
          hasFeedback
          validateStatus='success'
        >
          <a-input-number :min="1" id="callNo" v-model="mdl.callNo" style="width: 100%" />
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='状态'
          hasFeedback
          validateStatus='warning'
        >
          <a-select defaultValue='1' v-model="mdl.status">
            <a-select-option value='1'>Option 1</a-select-option>
            <a-select-option value='2'>Option 2</a-select-option>
            <a-select-option value='3'>Option 3</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='描述'
          hasFeedback
          help='请填写一段描述'
        >
          <a-textarea :rows="5" v-model="mdl.description" placeholder="..." id='description'/>
        </a-form-item>

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='更新时间'
          hasFeedback
          validateStatus='error'
        >
          <a-date-picker
            style="width: 100%"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
          />
        </a-form-item>

      </a-form>

    </a-modal>

    <a-modal
      title="添加人员"
      :width="1000"
      v-model="PhoneVisible"
      @ok="HandleUserPhoneAdd"
    >
      <a-form     
        :autoFormCreate="(form)=>{this.UseAddform = form}">
        <a-form-item
          :labelCol="{lg: {span: 5}, sm: {span:5}}"
          :wrapperCol="{lg: {span:6}, sm: {span:6} }"
          label='姓名'
          hasFeedback         
        >
          <a-input placeholder='联系人姓名' v-model="Mymdl.UserName" id='UserName' />
        </a-form-item>
        <a-form-item
          label="性别"
          :labelCol="{lg: {span: 5}, sm: {span:5}}"
          :wrapperCol="{lg: {span:6}, sm: {span:6} }"        
        >
          <a-radio-group v-model="Sex">
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>      
          </a-radio-group>      
        </a-form-item>   
        <a-row>
          <a-col :span="24">
            <a-form-item
              :labelCol="{lg: {span: 5}, sm: {span:5}}"
              :wrapperCol="{lg: {span:6}, sm: {span:6} }"        
              label='选择部门'
              hasFeedback
            >
              <a-cascader :showSearch="{filter}" v-model="Mymdl.DepKeylist" :options="options" @change="onChangeDeplist" placeholder="选择部门类别"/>
            </a-form-item>            
          </a-col>
          <a-col :span="24">
            <a-form-item
              :labelCol="{lg: {span: 5}, sm: {span:5}}"
              :wrapperCol="{lg: {span:6}, sm: {span:6} }"    
              label='职务'
              hasFeedback        
            >
              <a-input placeholder='填写联系人的职务信息' v-model="Mymdl.UJOB" id='UJOB' />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item
              :labelCol="{lg: {span: 5}, sm: {span:5}}"
              :wrapperCol="{lg: {span:6}, sm: {span:6} }"
              label='办公座机'
              hasFeedback        
            >
              <a-input placeholder='填写联系人的办公座机' v-model="Mymdl.tel" id='tel' />
            </a-form-item>           
          </a-col>
          <a-col :span="24">
            <a-form-item
              :labelCol="{lg: {span: 5}, sm: {span:5}}"
              :wrapperCol="{lg: {span:6}, sm: {span:6} }"
              label='办公手机'
              hasFeedback        
            >
              <a-input placeholder='填写联系人的办公手机' v-model="Mymdl.cellphone" id='cellphone' />
            </a-form-item>          
          </a-col>          
        </a-row>
        <!-- <a-form-item
         :labelCol="{lg: {span: 5}, sm: {span:5}}"
         :wrapperCol="{lg: {span:6}, sm: {span:6} }"
          label='生日'
          hasFeedback
         
        >
          <a-date-picker
            style="width: 100%"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
          />
        </a-form-item> -->

      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
  import Vue from 'vue'
  import STable from '@/components/table/'
  import ATextarea from "ant-design-vue/es/input/TextArea"
  import AInput from "ant-design-vue/es/input/Input"
  import { User_ID } from "@/store/mutation-types"
  import { mapState} from 'vuex'
  import { getRoleList, SelectDepByID, getServiceList,getUserrolesbyAdminID,GetPermissionByroleID,GetPermissioninfobyKey,AddPhoneUser,SelectALLDepByKey,AllPhoneUser} from '@/api/manage'
  import { setTimeout } from 'timers';
// GetPermissioninfobyKey
  export default {
    name: "TableList",
    components: {
      AInput,
      ATextarea,
      STable
    },
    computed:{
      ...mapState({
        S_DEPKEY:state=>state.user.DEPKEY
      })    
    },
    data () {
      return {
    
        initLoaddata:[],
        key:'',
        Sex:1,
        datas:{},
        DepName:[],
        PhoneVisible:false,
        visible: false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
        form: null,
        UseAddform:null,
        mdl: {},
        Mymdl:{},
        // 高级搜索 展开/关闭
        advanced: true,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '姓名',
            dataIndex: 'UserName'
          },
          {
            title: '单位',
            dataIndex: 'description'
          },
          {
            title: '职务',
            dataIndex: 'UJOB',
            // sorter: true,
            // needTotal: true,
            // customRender: (text) => text + ' 次'
          },
          {
            title: '工作座机',
            dataIndex: 'Tel',
           
          },
          {
            title: '工作手机',
            dataIndex: 'cellphone',
            sorter: true
          },
          //  {
          //   title: '移动手机1',
          //   dataIndex: 'updatedAt',
          //   sorter: true
          // },
          //  {
          //   title: '移动手机2',
          //   dataIndex: 'updatedAt',
          //   sorter: true
          // },
          {
            table: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' },
          }
        ],
         
        // 加载数据方法 必须为 Promise 对象
      
        loadData: parameter => {
            // console.log(this.queryParam)
         
                let path=this.$route.path
                let arr=path.split("/")                   
                let s=arr[3]
        if(typeof parameter == "string"){
          parameter = {pageNo:1,pageSize:10};
        }
        this.queryParam.key=s  
        return AllPhoneUser(Object.assign(parameter,this.queryParam))
            .then(res => {  
                 
              return res.result
            }).then(res=>{
              console.log('上一个返回的')
              console.log(res.data)
              res.data.forEach(v => {
                console.log(v.Department_ID)
              //  SelectDepByID(v.Department_ID).then(res=>{
              //    console.log(res)
              //  })

              });
              //SelectDepByID
               return res
            })
             
        },
       options:[],

        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      getRoleList({ t: new Date()})
     
        //  GetPermissioninfobyKey({key:'qw'}).then(res=>{
        //    console.log(res)
        //  })
    },
    async mounted(){   
   
        //  this.$store.commit('SET_DEPKEY',this.$route.meta.permission[0]);
     
      this.DepName=await this.GetDepName();
      this.options=await this.GetDepnameAndchild()
    
  
    },
    methods: {
    filter(inputValue, path) {
      return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
    },
    onChangeDeplist(value) {
      return value;
    },
      async GetDepnameAndchild()
      {
      let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）
      const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个
      let _temp=''
      let s =''
      let DepArr=[]
      let childDep=[]
        for (let x in roleslist.roles)
        {
              let res=await  GetPermissionByroleID({ID:roleslist.roles[x]})//根据rolesID 拿到Permissionlist 返回字符串类型
              _temp=res.result+'|'               //合并循环出来的字符串
              s+=_temp                //同上
        }
           let _arr=s.split('|')//按 “|”分隔符生成数组    
       var r = _arr.filter(function(element,index,self){//数组去重         
       return self.indexOf(element) === index && element //去无效属性
    })   
    // console.log(r)
     for (let x in r)
        {         
            const obj=new Object();
            const res=await GetPermissioninfobyKey({key:r[x]})
            const depchild=await SelectALLDepByKey({s:res.result.Permission_key})
            obj.label=res.result.Permission_name,
            obj.value=res.result.Permission_key,
            DepArr.push(obj)
          for(let i in depchild)
          {
            if(depchild.code==1)
            {            
            obj.children=depchild[i]
            }            
          }
           
        }
        // console.log(DepArr)
        return DepArr

     
      },
     
     async GetDepName()
    {
      let  userid= {AdminID:Vue.ls.get(User_ID)} //在本地localStorage里拿到登陆后的管理员ID（AdminID）
      const roleslist= await getUserrolesbyAdminID({AdminID:userid.AdminID})//根据管理员ID 获取到RolesID 可能是一个也可以能是多个
      let _temp=''
      let s =''
      let DepArr=[]
        for (let x in roleslist.roles)
        {
              let res=await  GetPermissionByroleID({ID:roleslist.roles[x]})//根据rolesID 拿到Permissionlist 返回字符串类型
              _temp=res.result+'|'               //合并循环出来的字符串
              s+=_temp                //同上
        }
       let _arr=s.split('|')//按 “|”分隔符生成数组    
       var r = _arr.filter(function(element,index,self){//数组去重         
       return self.indexOf(element) === index && element //去无效属性
    })      
      
        for (let x in r)
        {
         
            const obj=new Object();
            const res=await GetPermissioninfobyKey({key:r[x]})
                        //console.log(res)           
            obj.DepName=res.result.Permission_name,
            obj.Depkey=res.result.Permission_key,
            obj.OrderID=res.result.OrderID,
            DepArr.push(obj)
        }
        
        return DepArr
    
   },
        
       HandleUserPhoneAdd(e)
        {
        this.Mymdl.Sex=this.Sex
        e.preventDefault()
        this.UseAddform.validateFields(async(err, values) => {
          if (!err) {
          const res=await AddPhoneUser(this.Mymdl)
          if(res.code==-1)
          {
             this.$message.error(res.message);                    
          }
          else
          {                     
            setTimeout(() => {
            
              this.$message.success('添加人员成功。'); 
              this.$refs.mytable.refresh()
              this.PhoneVisible = false    
            }, 100);                            
          }
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', values)
          }
        })  

           
        },
      async addphone()
        {                  
            this.PhoneVisible = true  
            this.$nextTick(()=>{
            this.UseAddform.resetFields()   
            })
        },
      handleEdit (record) {
        this.mdl = Object.assign({}, record)
        // console.log(this.mdl)
        this.visible = true
      },
      handleOk () {

      },
      onChange (row) {
    
        this.selectedRowKeys = row.selectedRowKeys
        this.selectedRows = row.selectedRows

      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      // initLoadDate(params)
      // {     
      //  let path=this.$route.path
      //  let arr=path.split("/")
      //  let s=arr[3]
      //   if(typeof params == "string"){
      //     params = {pageNo:1,pageSize:10};
      //   }
      //   this.queryParam.key=s      
      //   //debugger;
      //   return AllPhoneUser(Object.assign(params,this.queryParam))
      //       .then(res => {
      //           if(res)
      //           {
      //               console.log(res.result)                             
      //               return res.result
      //           }                  
      //       })
      //   },   
    },
  watch: {
    '$route'()
    {
      console.log(`state---------------`)
      console.log(this.$route.meta.permission[0])
        this.$store.commit('SET_DEPKEY',this.$route.meta.permission[0]);
        this.$refs.mytable.refresh()     
    }
  //  'S_DEPKEY':'initLoadDate'
        // S_DEPKEY(val){

        //   this.key=val;
        //   console.log(`+++++++++++++++++++`)         
        //   this.queryParam.key=this.key
        //   console.log(this.queryParam)

   
        //   console.log('数据变化了')
        
        // }
             //   return AllPhoneUser(Object.assign(parameter, this.queryParam))
        //     .then(res => {
        //       console.log(res.result.data)
        //       return res.result
        //     })
        // },
        //     '$route' (to) {
        //       console.log(to)
        //         this.$router.go(0);
  
// },
  // '$route':'Getparams'
    // '$route' (to,from ) {
    //       this.$router.push({
    //           path:'/list/UserPhonelist/'+this.$route.meta.permission[0]    
    //   })
    //       console.log(from)
    // }
    
},


 

  }
</script>