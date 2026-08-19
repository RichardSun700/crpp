# Context Rights & Portability Protocol

**CRPP 是一个开放、厂商中立的协议，用于确定哪些工作 Context 留在公司、个人可以保留哪些可携带能力，以及项目结束后如何治理多人共同产生的 Context。**

> 状态：`0.1.0-draft.1`。CRPP 是实验性的技术和治理协议，不是法律意见、认证，也不能替代劳动、隐私、保密、知识产权或数据处理协议。

[English](README.md) · [中文规范草案](SPEC.zh-CN.md) · [治理](GOVERNANCE.md) · [参与贡献](CONTRIBUTING.md)

## 要解决的问题

AI 系统越来越依赖累积的 Context：决策、失败路径、关系、工作方法、判断模式和工具调度技能。当前通常把这些内容当作无法拆分的一堆数据：

- 公司保存全部资料，个人失去在工作中形成的能力连续性；或者
- 个人复制工作资料，泄露公司秘密、其他贡献者或第三方数据。

CRPP 把 Context 分为四个 authority domain，并在生成时写入机器可读的规则：

| Domain | 默认作用 |
|---|---|
| `company` | 合法、授权业务范围内的完整记录 |
| `personal` | 私人 Context、可分割的个人贡献和合规能力投影 |
| `joint` | 通过托管进行多方治理的不可分割 Context |
| `third_party` | 受客户、用户、患者、合作方或法律独立约束的 Context |

## 核心默认规则

权利应当在 Context **产生之前或产生当时**约定。

没有事前约定时：

1. 公司保留其完整、授权的业务记录；
2. 每个人只保留自己的可分割原始贡献，以及由该贡献生成的合规能力投影；
3. 不可分割的共同 Context 进入 Joint Context Escrow，不自动复制给任何参与者；
4. 后续永久携带、限时调用或条件租用，需要受影响贡献者和独立第三方控制者进行范围化授权；
5. 读取、复制、模型训练、公开、商业化和再次授权是彼此独立的权限。

默认规则不会让自称“主要贡献者”的人单方面占有共同 Context。

## 从生成时开始可携带

去标识化不能等到离职或导出时才做。授权工作事件在生成阶段被路由：

```text
授权工作事件
  -> 约定与目的解析
  -> 来源与 Authority 分类
  -> 公司完整记录
  -> 每位参与者的可携带能力投影
       -> 泄漏检查 -> 隔离/复核 -> 个人域
  -> 共同 Context 托管
  -> 第三方保护层
  -> 签名 Manifest 与审计事件
```

可携带投影描述可复用的能力——方法、检查项、决策模式和工具调度——而不是公司机密事实的摘要。

## 当前草案包含

- 英文规范主版本和完整中文翻译；
- Agreement、Context Object、Projection、Joint Context、Grant、Attestation、Revocation 和 Audit Event 的 JSON Schema；
- 合成的 valid/invalid 合规场景；
- 可重复执行的 conformance runner；
- 通过 Context Enhancement Proposal（CEP）进行公开治理。

参考 policy engine、生成时投影管线、Joint Context Escrow 和 MCP/REST 适配器将在核心草案验证后实现。

## 如何参与

- 早期概念和规范问题进入 Discussions；
- 明确缺陷、翻译差异和合规问题进入 Issues；
- 新协议对象、权利变化、breaking change 或治理变化必须提交 CEP；
- Schema 变化必须同时提交规范说明和 valid/invalid fixtures。

参见 [CONTRIBUTING.md](CONTRIBUTING.md)。所有公开示例必须使用合成数据，禁止包含雇主、员工、客户、患者或用户的真实资料。

## 许可证

- 规范、图示、说明性示例和翻译：[CC BY 4.0](LICENSE-SPEC)
- Schema、合规测试和参考代码：[Apache License 2.0](LICENSE-CODE)

Memova 是本仓库的发起参考参与者，但没有永久否决权；CRPP 不依赖 Memova 或任何其他厂商。
